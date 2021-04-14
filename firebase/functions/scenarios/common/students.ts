import {randFromRange, range} from '@utils/native/number.utils';
import {TEST_COURSE} from './defaults';
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
