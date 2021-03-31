import {DocumentStat} from '@lib/models/document.model';

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
  stats: Map<string, DocumentStat>
}
