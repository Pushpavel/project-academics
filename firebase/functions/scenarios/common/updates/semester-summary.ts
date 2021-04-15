/* tslint:disable:no-non-null-assertion */
import * as admin from 'firebase-admin';
import {divideArray} from '../../../../../src/lib/utils/native/array.utils';
import {mapMapEntries} from '../../../../../src/lib/utils/native/map.utils';

const firestore = admin.firestore();

export async function createSemesterSummary(semId: string) {
  // get all rollNos
  const snaps = await firestore.collectionGroup('public_course_documents').get();
  const credits = new Map<string, number>();
  const studentCourses = new Map<string, string[]>();

  // gather document snapshots into <course,credit> map and <student,courses> map
  snaps.docs.forEach(doc => {
    if (doc.id == 'STUDENTS') {
      const entries = doc.get('entries');
      for (const rollNo of Object.keys(entries)) {
        const courseCodes = studentCourses.get(rollNo) ?? [];
        courseCodes.push(doc.ref.parent.parent!.id);
        studentCourses.set(rollNo, courseCodes);
      }
    } else if (doc.id == 'COURSE_DETAIL')
      credits.set(doc.ref.parent.parent!.id, doc.get('credits'));
  });

  // compute total credits using studentCourses and credits map
  const totalCredits = mapMapEntries(studentCourses, (rollNo, courses) => {
    let totalCredits = 0;
    for (const courseCode of courses)
      totalCredits += credits.get(courseCode)!;
    return [rollNo, totalCredits];
  });

  // commit semester summary entries to firestore
  const segments = divideArray([...totalCredits.entries()], 500);
  const commits = [];
  for (const segment of segments) {
    const batch = firestore.batch();
    for (const [rollNo, totalCredit] of segment) {
      batch.set(firestore.doc('semesters/' + semId + '/summary/' + rollNo), {
        totalCredits: totalCredit,
      });
    }
    commits.push(batch.commit());
  }

  await Promise.all(commits);

  return totalCredits;
}
