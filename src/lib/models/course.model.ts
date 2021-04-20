import {DeptFields} from './document/document-base.model';

export interface CourseRaw {
  sem: string,
  batch: string,
  courseCode: string,
  name: string,
  facultyId: string,
  dept: DeptFields
}

export interface CourseDetailRaw {
  courseCode: string,
  credits: number,
  name: string,
  studentCount: number,
  facultyName: string,
  facultyId: string
}


export interface UserCourseRelation {
  isFaculty?: boolean,
  isHod?: boolean,
  isExamCell?: boolean,
  isStudent?: boolean,
}

