import {CourseRaw, CourseDetailRaw} from '@models/course.model';
import {Injectable} from '@angular/core';
import firebase from 'firebase/app';
import {SourceService} from 'lib/data/base/service.abstract';
import {courseCodeExtract} from 'lib/data/convert/common';
import {DeptId} from '../../models/document/document-base.model';
import Query = firebase.firestore.Query;
import FieldPath = firebase.firestore.FieldPath;

@Injectable({
  providedIn: 'root'
})
export class CourseSources extends SourceService {

  courseDetail(semId: string, courseCode: string) {

    return this.service.fetchObj<CourseDetailRaw>({
      path: `semesters/${semId}/courses/${courseCode}/public_course_documents/COURSE_DETAIL`,
      convert: courseCodeExtract<CourseDetailRaw>(),
    });

  }

  course(semId: string, courseCode: string) {

    return this.service.fetchObj<CourseRaw>({
      path: `semesters/${semId}/courses/${courseCode}`,
      idField: 'courseCode',
    });

  }

  courses(query: { semId: string, facultyId?: string, courseCodes?: string[], batch?: string, deptId?: DeptId }) {

    return this.service.fetchList<CourseRaw>({
      path: `semesters/${query.semId}/courses`,
      idField: 'courseCode',
      query: (q: Query) => {

        if (query.facultyId)
          q = q.where('facultyId', '==', query.facultyId);

        if (query.courseCodes)
          q = q.where(FieldPath.documentId(), 'in', query.courseCodes);

        if (query.batch)
          q = q.where('batch', '==', query.batch);

        if (query.deptId)
          q = q.where(`dept.${query.deptId}`, '!=', null);

        return q;
      }
    });
  }

}
