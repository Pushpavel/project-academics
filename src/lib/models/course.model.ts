import {DocumentStat} from '@lib/models/document.model';

export interface Course {
  courseId: string
  CourseName: string
}

export interface CourseDocumentStats {
  courseCode: string,
  courseName: string,
  stats: Map<string, DocumentStat>
}
