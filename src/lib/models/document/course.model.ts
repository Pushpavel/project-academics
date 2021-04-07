import {StatEntryRaw} from '@lib/models/document/document-stat.model';
import {DocumentId} from '@lib/models/document/document-base.model';

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
  stats: Record<DocumentId, StatEntryRaw>
}

export interface UserCourseRelation {
  isFaculty?: boolean,
  isHod?: boolean,
}

