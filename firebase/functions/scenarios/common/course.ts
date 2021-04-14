import {CourseDetailRaw, CourseRaw} from '@models/course.model';
import {pascalCase} from '@utils/native/string.utils';
import * as admin from 'firebase-admin';
import {COURSE_PATH, PROTECTED_DOCUMENT_PATH, PUBLIC_DOCUMENT_PATH} from '@constants/firestore.path';
import {objectFromMap} from '@utils/native/map.utils';
import {randFromRange} from '@utils/native/number.utils';
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
    dept: {[course.dept]: 'core'},
    courseName: _courseName,
    entries: {}
  };

  const _courseDetail: Deletable<CourseDetailRaw, 'courseCode'> = {
    name: _courseName,
    credits: randFromRange(2, 3),
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
  await createPublicStudentEntries(course.courseCode, _course, [...studentNames.keys()]);

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

export async function createPublicStudentEntries(courseCode: string, course: Deletable<CourseRaw, 'courseCode'>, rollNos: string[]) {
  const p = {semId: course.sem, courseCode};

  const entriesRef = firestore.collection(`${COURSE_PATH(p)}/public_student_entries`);
  const batch = firestore.batch();
  for (const rollNo of rollNos)
    batch.set(entriesRef.doc(rollNo), {
      rollNo,
      entries: {}
    });

  await batch.commit();
}

