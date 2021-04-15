import {createSemester} from './common/semester';
import {createFaculty} from './common/test-faculty';
import {generateRollNos, generateStudentNames} from './common/students';
import {createCourse} from './common/course';
import {createPrivateDocuments} from './common/documents';
import {completed} from '../src/error.utils';

/**
 * generates one faculty and one course with students in initial state
 */
export async function _generateScenario() {
  const semId = await createSemester();
  const faculty = await createFaculty();
  const rollNos = await generateRollNos();
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
