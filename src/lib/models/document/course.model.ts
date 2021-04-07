import {StatEntryRaw} from '@lib/models/document/document-stat.model';

export interface CourseRaw {
  courseCode: string,
  name: string,
  facultyId: string,
}

export interface CourseDetailRaw {
  courseCode: string
  name: string,
  studentCount: string,
  facultyName: string,
  facultyId: string
}

export interface CourseDocumentStats {
  courseCode: string,
  courseName: string,
  stats: Map<string, StatEntryRaw>
}

export interface UserCourseRelation {
  isFaculty?: boolean,
  isHod?: boolean,
}

