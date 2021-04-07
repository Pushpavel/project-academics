import {CourseRaw, CourseDetailRaw} from '@lib/models/document/course.model';
import {fetchObj} from '@lib/data-adapters/base/firestore.adapter';
import {courseDetailConvert} from '@lib/data-adapters/convert/course-detail.convert';

export function courseDetail(semId: string, courseCode: string) {
  return fetchObj<CourseDetailRaw>({
    path: `semesters/${semId}/courses/${courseCode}/public_course_documents/COURSE_DETAIL`,
    convert: courseDetailConvert,
    once: true
  });
}

export function course(semId: string, courseCode: string) {
  return fetchObj<CourseRaw>({
    path: `semesters/${semId}/courses/${courseCode}`,
    idField: 'courseCode',
    once: true
  });
}
