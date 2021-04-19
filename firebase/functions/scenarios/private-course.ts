import {createSemester} from './common/semester';
import {createFaculty} from './common/test-faculty';
import {generateRollNos, generateStudentNames, importTestStudent} from './common/students';
import {createCourse} from './common/course';
import {createPrivateDocuments} from './common/documents';
import {completed} from '../src/error.utils';

/**
 * auth:
 *      one faculty: f0@nitpy.ac.in
 *      one student: CS19B1001@nitpy.ac.in
 *      one hod: hodCS@nitpy.ac.in
 *
 * firestore:
 * one sem: 2020_2
 * one course with students in initial state : CS208
 */
export async function _generateScenario() {
  const semId = await createSemester('2020_2');
  const faculty = await createFaculty({
    displayName: `Faculty 0's Name`,
    uid: 'f0@nitpy.ac.in',
    email: 'f0@nitpy.ac.in',
  });

  await createFaculty({
    displayName: 'CSE Hod\'s Name',
    uid: 'hodCS@nitpy.ac.in',
    email: 'hodCS@nitpy.ac.in',
  }, false, true, 'CS');

  await importTestStudent();

  const rollNos = await generateRollNos('CS', '19B1');
  const studentNames = generateStudentNames(rollNos);

  const {courseCode, course} = await createCourse({
    semId,
    courseCode: 'CS208',
    dept: 'CS',
    batchId: '19',
  }, faculty, studentNames);

  await createPrivateDocuments(courseCode, course, rollNos);

  return completed();
}
