import {PRIVATE_DOCUMENT_IDS} from '../../../src/lib/constants/document.constants';
import {range} from '../../../src/lib/utils/native/number.utils';
import {completed} from '../src/error.utils';
import {_submitDocument} from '../src/submitDocument';
import {createCourse, generateCourseCodes} from './common/course';
import {createPrivateDocuments} from './common/documents';
import {createSemester} from './common/semester';
import {createStudents, generateRollNos, generateStudentNames} from './common/students';
import {createFaculty} from './common/test-faculty';

/**
 * Useful for testing exam cell and hod features and student features
 *
 * auth:
 * one exam cell: ec@nitpy.ac.in
 * HODs: hod*@nitpy.ac.in (*: deptId)
 * faculties: f*@nitpy.ac.in (*:  number)
 * students: *@nitpy.ac.in (*:  rollNo)
 * hod is also faculty
 *
 * firestore:
 * one sem: 2020_2
 * courses:
 *      batch: B Tech i,ii,iii,iv
 *      dept: CSE, MECH, ECE, EEE, CIVIL
 *      documents: submitted
 *      document-entries: random values
 *
 */
export async function _generateScenario() {
  const DEPT_IDS = ['CS', 'ME', 'EC', 'EE', 'CE'] as const;
  const BATCH_IDS = ['17B1', '18B1', '19B1', '20B1'] as const;
  const NO_OF_COURSE_PER_DEPT_BATCH = 5;
  const NO_OF_COURSE_PER_FACULTY = 5;// must be a factor of (no of depts)*(no of batches)*(no of courses per batch)
  const SUBMITTED_DOCUMENT_IDS = PRIVATE_DOCUMENT_IDS;

  const semId = await createSemester();

  const faculties = [];

  // create hods
  for (const deptId of DEPT_IDS) {
    const hod = await createFaculty({
      uid: `hod${deptId}@nitpy.ac.in`,
      email: `hod${deptId}@nitpy.ac.in`,
    }, true, deptId);

    faculties.push(hod);
  }

  // generate faculties
  const noOfFaculties = ((DEPT_IDS.length * BATCH_IDS.length * NO_OF_COURSE_PER_DEPT_BATCH) / NO_OF_COURSE_PER_FACULTY) - 5;

  for (const i of range(noOfFaculties)) {
    const faculty = await createFaculty({
      uid: `f${i}@nitpy.ac.in`,
      email: `f${i}@nitpy.ac.in`,
    });

    faculties.push(faculty);
  }

  // generate students and courses
  for (const deptId of DEPT_IDS) {
    const di = DEPT_IDS.indexOf(deptId);

    for (const batchId of BATCH_IDS) {
      const bi = batchId.indexOf(batchId);
      const i = BATCH_IDS.length * di + bi;

      // create students
      const rollNos = await generateRollNos(deptId, batchId);
      const studentNames = generateStudentNames(rollNos);
      await createStudents(studentNames);

      // create course codes
      const courseCodes = generateCourseCodes({
        count: NO_OF_COURSE_PER_DEPT_BATCH,
        batchNo: bi + 1, semId, deptId
      });

      // create courses
      for (const courseCode of courseCodes) {
        const {course} = await createCourse({dept: deptId, courseCode, batchId, semId}, faculties[i], studentNames);
        await createPrivateDocuments(courseCode, course, rollNos, true);

        //  submitting all private document
        for (const id of SUBMITTED_DOCUMENT_IDS)
          _submitDocument({semId, courseCode, documentId: id}, {auth: faculties[i]} as any);

      }
    }
  }

  return completed();

}
