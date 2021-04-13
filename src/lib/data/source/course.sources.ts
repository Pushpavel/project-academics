import {CourseRaw, CourseDetailRaw} from '@models/course.model';
import {courseDetailFromSnapshot} from '@lib/data/convert/course-detail-from.snapshot';
import {Injectable} from '@angular/core';
import {SourceService} from '@lib/data/base/service.abstract';

@Injectable({
  providedIn: 'root'
})
export class CourseSources extends SourceService {

  courseDetail(semId: string, courseCode: string) {

    return this.service.fetchObj<CourseDetailRaw>({
      path: `semesters/${semId}/courses/${courseCode}/public_course_documents/COURSE_DETAIL`,
      convert: courseDetailFromSnapshot,
      once: true
    });

  }

  course(semId: string, courseCode: string) {

    return this.service.fetchObj<CourseRaw>({
      path: `semesters/${semId}/courses/${courseCode}`,
      idField: 'courseCode',
      once: true
    });

  }

}
