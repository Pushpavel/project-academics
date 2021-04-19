import {randFromRange, range} from '../../../../src/lib/utils/native/number.utils';
import {_importUsers} from '../../src/importUsers';
import * as faker from 'faker';

export function generateRollNos(dept: string, batch: string) {
  const rollNos: string[] = [];

  for (const no of range(1, randFromRange(30, 60)))
    rollNos.push(dept + batch + no.toString().padStart(3, '0'));

  return rollNos;
}

export function generateStudentNames(rollNos: string[]) {
  return new Map(rollNos.map(rollNo => [rollNo, faker.name.findName()]));
}

export function importTestStudent() {
  return _importUsers({
    claims: ['isStudent'],
    users: [{
      uid: 'CS19B1001',
      email: 'CS19B1001@nitpy.ac.in',
      displayName: `Test Student's Name`,
    }]
  });

}
