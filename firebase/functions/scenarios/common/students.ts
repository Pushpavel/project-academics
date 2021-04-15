import {divideArray, reduce2dArray} from '../../../../src/lib/utils/native/array.utils';
import {randFromRange, range} from '../../../../src/lib/utils/native/number.utils';
import {_importUsers} from '../../src/importUsers';
import {TEST_COURSE, UserRecord} from './defaults';
import * as faker from 'faker';

export function generateRollNos(dept: string = Object.keys(TEST_COURSE.dept)[0], batch: string = TEST_COURSE.batch) {
  const rollNos: string[] = [];

  for (const no of range(randFromRange(30, 60)))
    rollNos.push(dept + batch + no.toString().padStart(3, '0'));

  return rollNos;
}

export function generateStudentNames(rollNos: string[]) {
  return new Map(rollNos.map(rollNo => [rollNo, faker.name.findName()]));
}

export async function createStudents(studentNames: Map<string, string>) {
  const studentsSegments = divideArray([...studentNames.keys()], 1000).map(segment => {
      const students: UserRecord[] = segment.map(rollNo => ({
        displayName: studentNames.get(rollNo),
        uid: rollNo,
        email: rollNo + '@nitpy.ac.in'
      }));
      return students;
    }
  );

  const userImportPromises = studentsSegments.map(seg => {
    return _importUsers({
      claims: ['isStudent'],
      users: seg
    });
  });

  await Promise.all(userImportPromises);

  return reduce2dArray(studentsSegments);
}
