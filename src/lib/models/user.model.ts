import {DeptId} from '@lib/models/document/document-base.model';

export interface AcademicUser {
  uid: string, // can be roll_no or email id depending on user
  displayName: string;
  email: string;
  isStudent?: boolean,
  isFaculty?: boolean,
  isExamCell?: boolean,
  isHod?: DeptId
}
