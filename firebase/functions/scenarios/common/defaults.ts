import * as admin from 'firebase-admin';
import {CourseRaw} from '@models/course.model';

export type UserRecord = admin.auth.UserImportRecord

export const TEST_FACULTY: UserRecord = {
  displayName: `Test Faculty's Name`,
  uid: 'testfaculty@nitpy.ac.in',
  email: 'testfaculty@nitpy.ac.in',
};

export const TEST_COURSE: CourseRaw = {
  sem: '2020_2',
  courseCode: 'CS208',
  name: 'Test Course\'s Name',
  batch: '19B1',
  dept: {
    CS: 'core'
  },
  facultyId: TEST_FACULTY.uid,
};
