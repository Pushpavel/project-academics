import {DocumentStat} from '@lib/models/document.model';

export type CourseDetailRaw = CourseDetail

export interface CourseDetail {
  courseCode: string
  name: string,
  studentCount: string,
  facultyName: string,
  facultyId: string
}

export interface CourseDocumentStats {
  courseCode: string,
  courseName: string,
  stats: Map<string, DocumentStat>
}
