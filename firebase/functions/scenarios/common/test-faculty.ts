import * as faker from 'faker';
import {DeptId} from '../../../../src/lib/models/document/document-base.model';
import {_importUsers} from '../../src/importUsers';
import {TEST_FACULTY, UserRecord} from './defaults';


export async function createFaculty(faculty: UserRecord = TEST_FACULTY, isHod?: boolean, dept?: DeptId) {

  const _faculty: UserRecord = {
    displayName: faker.name.findName(),
    ...faculty,
  };

  const claims = ['isFaculty'];

  if (isHod)
    claims.push('isHod');

  await _importUsers({
    claims,
    dept,
    users: [_faculty]
  });

  return faculty;
}
