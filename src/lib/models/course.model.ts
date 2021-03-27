import {DocStatus} from '@lib/models/other.model';

export interface Course {
  courseId: string
  CourseName: string
}

export interface CourseDocumentStat {
  courseCode: string,
  id: string,
  name: string,
  status: DocStatus,
  timestamp: number
}
