import {CourseDetailRaw, CourseRaw} from '@models/course.model';
import * as admin from 'firebase-admin';
import {COURSE_PATH, PROTECTED_DOCUMENT_PATH, PUBLIC_DOCUMENT_PATH} from '../../../../src/lib/constants/firestore.path';
import {objectFromMap} from '../../../../src/lib/utils/native/map.utils';
import {randFromRange, range} from '../../../../src/lib/utils/native/number.utils';
import {pascalCase} from '../../../../src/lib/utils/native/string.utils';
import {UserRecord} from './defaults';
import {DeptId} from '@models/document/document-base.model';
import * as faker from 'faker';
import {Deletable} from '@models/util.types';
import {StatsDocumentRaw} from '@models/document/document-stat.model';

const firestore = admin.firestore();

export async function createCourse(
  course: {
    semId: string,
    courseCode: string,
    batchId: string,
    dept: DeptId,
  },
  faculty: UserRecord,
  studentNames: Map<string, string>,
) {

  const _courseName = generateCourseName();

  const _course: Deletable<CourseRaw, 'courseCode'> = {
    sem: course.semId,
    batch: course.batchId,
    dept: {[course.dept]: 'core'},
    facultyId: faculty.uid,
    name: _courseName,
  };


  const _stats: StatsDocumentRaw = {
    sem: course.semId,
    batch: course.batchId,
    document: 'DOCUMENT_STATS',
    dept: {[course.dept]: 'core'},
    courseName: _courseName,
    entries: {}
  };

  const _courseDetail: Deletable<CourseDetailRaw, 'courseCode'> = {
    name: _courseName,
    credits: randFromRange(1, 3),
    studentCount: studentNames.size,
    facultyId: faculty.uid,
    facultyName: faculty.displayName ?? 'Test Faculty Name'
  };

  const p = {semId: _course.sem, courseCode: course.courseCode,};

  const batch = firestore.batch();
  batch.set(firestore.doc(COURSE_PATH(p)), _course);
  batch.set(firestore.doc(PUBLIC_DOCUMENT_PATH(p, 'COURSE_DETAIL')), _courseDetail);
  batch.set(firestore.doc(PROTECTED_DOCUMENT_PATH(p, 'DOCUMENT_STATS')), _stats);
  batch.set(firestore.doc(PUBLIC_DOCUMENT_PATH(p, 'STUDENTS')), {entries: objectFromMap(studentNames)});


  await batch.commit();
  await createPublicStudentEntries(course.courseCode, _course, _courseDetail, [...studentNames.keys()]);

  return {
    courseCode: course.courseCode,
    course: _course,
    courseDetail: _courseDetail,
    stats: _stats,
  };
}


function generateCourseName() {
  let courseAdjective = randFromRange(0, 1) ? faker.company.bsAdjective() : faker.hacker.adjective();
  courseAdjective = randFromRange(0, 1) ? faker.company.bsBuzz() : courseAdjective;

  const courseNoun = randFromRange(0, 1) ? faker.company.bsNoun() : faker.hacker.noun();
  const courseNoun2 = randFromRange(0, 1) ? ' and ' + faker.company.catchPhraseNoun() : '';

  return pascalCase(courseAdjective + ' ' + courseNoun + courseNoun2);
}

async function createPublicStudentEntries(
  courseCode: string,
  course: Deletable<CourseRaw, 'courseCode'>,
  courseDetail: Deletable<CourseDetailRaw, 'courseCode'>,
  rollNos: string[]
) {

  const p = {semId: course.sem, courseCode};

  const entriesRef = firestore.collection(`${COURSE_PATH(p)}/public_student_entries`);
  const batch = firestore.batch();
  for (const rollNo of rollNos)
    batch.set(entriesRef.doc(rollNo), {
      rollNo,
      sem: course.sem,
      batch: course.batch,
      credits: courseDetail.credits,
      courseName: courseDetail.name,
      entries: {}
    });

  await batch.commit();
}

export function generateCourseCodes(data: { count: number, deptId: string, semId: string, batchNo: number | string }) {
  const evenSem = data.semId[data.semId.length - 1] == '2';
  return range(data.count).map(i => {
    const no = evenSem ? 2 * (i + 1) : 2 * i + 1;
    return data.deptId + data.batchNo + no.toString().padStart(2, '0');
  });
}
