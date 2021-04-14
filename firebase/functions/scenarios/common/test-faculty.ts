import {_importUsers} from '../../src/importUsers';
import {TEST_FACULTY, UserRecord} from './defaults';


export async function createTestFaculty(faculty: UserRecord = TEST_FACULTY) {

  await _importUsers({
    claims: ['isFaculty'],
    users: [faculty]
  });

  return faculty;
}
