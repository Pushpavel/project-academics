import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {COURSE_PATH} from '../../constants/firestore.path';
import {StudentRaw} from '../../models/student.model';
import {SourceService} from '../base/service.abstract';
import {courseCodeExtract} from '../convert/common';

@Injectable({
  providedIn: 'root'
})
export class StudentsSources extends SourceService {

  publicStudentEntries(query: { rollNo: string, semId: string, courseCode?: string }) {

    if (query.courseCode)
      return this.service.fetchObj<StudentRaw>({
        path: COURSE_PATH(query as any) + '/public_student_entries/' + query.rollNo,
        convert: courseCodeExtract<StudentRaw>(),
      }).pipe(map(entry => entry ? [entry] : []));

    return this.service.fetchList<StudentRaw, true>({
      path: 'public_student_entries',
      convert: courseCodeExtract<StudentRaw>(),
      colGroupQuery: true,
      query: q => q
        .where('sem', '==', query.semId)
        .where('rollNo', '==', query.rollNo)
    });
  }
}
