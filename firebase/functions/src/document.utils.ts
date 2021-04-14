import {CourseRaw} from '@models/course.model';

export function queryMarkers(course: CourseRaw, documentId: string) {
  return {
    sem: course.sem,
    batch: course.batch,
    dept: course.dept,
    document: documentId,
  };
}
