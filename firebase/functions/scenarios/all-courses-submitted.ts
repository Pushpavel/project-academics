import {PRIVATE_DOCUMENT_IDS} from '../../../src/lib/constants/document.constants';
import {range} from '../../../src/lib/utils/native/number.utils';
import {completed} from '../src/error.utils';
import {_importUsers} from '../src/importUsers';
import {_submitDocument} from '../src/submitDocument';
import {createCourse, generateCourseCodes} from './common/course';
import {createPrivateDocuments} from './common/documents';
import {createSemester} from './common/semester';
import {generateRollNos, generateStudentNames, importTestStudent} from './common/students';
import {createFaculty} from './common/test-faculty';

/**
 * Useful for testing exam cell and hod features and student features
 * TODO: GRADES is not submitted , test _submitGrades function and use it
 *
 * auth:
 * one exam cell: ec@nitpy.ac.in
 * HODs: hodCS@nitpy.ac.in
 * faculties: f0@nitpy.ac.in
 * students: CS19B1001@nitpy.ac.in
 * hod is also faculty
 *
 * firestore:
 * one sem: 2020_2
 * courses:
 *      batch: B Tech i,ii,iii,iv
 *      dept: CSE, MECH, ECE, EEE, CIVIL
 *      documents: submitted
 *      document-entries: random values
 */
export async function _generateScenario() {
  const DEPT_IDS = ['CS', 'ME', 'EC', 'EE', 'CE'] as const;
  const BATCH_IDS = ['17B1', '18B1', '19B1', '20B1'] as const;
  const NO_OF_COURSE_PER_DEPT_BATCH = 5;
  const NO_OF_COURSE_PER_FACULTY = 5;// must be a factor of (no of depts)*(no of batches)*(no of courses per batch)
  const SUBMITTED_DOCUMENT_IDS = PRIVATE_DOCUMENT_IDS;

  const semId = await createSemester();

  const faculties = [];

  // create exam cell
  await _importUsers({
    claims: ['isExamCell'],
    users: [{
      displayName: `Exam Cell's Name`,
      uid: 'ec@nitpy.ac.in',
      email: 'ec@nitpy.ac.in',
    }]
  });

  // create hods
  for (const deptId of DEPT_IDS) {
    const hod = await createFaculty({
      uid: `hod${deptId}@nitpy.ac.in`,
      email: `hod${deptId}@nitpy.ac.in`,
    }, deptId != 'CS', true, deptId);

    faculties.push(hod);
  }

  // generate faculties
  const noOfFaculties = ((DEPT_IDS.length * BATCH_IDS.length * NO_OF_COURSE_PER_DEPT_BATCH) / NO_OF_COURSE_PER_FACULTY) - 5;

  for (const i of range(noOfFaculties)) {
    const faculty = await createFaculty({
      uid: `f${i}@nitpy.ac.in`,
      email: `f${i}@nitpy.ac.in`,
    }, i != 0);

    faculties.push(faculty);
  }

  // import only one student
  await importTestStudent();

  // generate students and courses
  for (const deptId of DEPT_IDS) {
    const di = DEPT_IDS.indexOf(deptId);

    for (const batchId of BATCH_IDS) {
      const bi = BATCH_IDS.indexOf(batchId);
      const i = BATCH_IDS.length * di + bi;

      // create students
      const rollNos = await generateRollNos(deptId, batchId);
      const studentNames = generateStudentNames(rollNos);

      // create course codes
      const courseCodes = generateCourseCodes({
        count: NO_OF_COURSE_PER_DEPT_BATCH,
        batchNo: bi + 1, semId, deptId
      });

      // create courses
      for (const courseCode of courseCodes) {

        //  assign f0@nitpy.ac.in to CS208
        const faculty = (courseCode == 'CS208') ? faculties[5] : faculties[i];

        const {course} = await createCourse({dept: deptId, courseCode, batchId, semId}, faculty, studentNames);
        await createPrivateDocuments(courseCode, course, rollNos, true);

        //  submitting all private document
        for (const id of SUBMITTED_DOCUMENT_IDS)
          await _submitDocument({semId, courseCode, documentId: id}, {auth: faculty} as any);

      }
    }
  }

  return completed();

}


