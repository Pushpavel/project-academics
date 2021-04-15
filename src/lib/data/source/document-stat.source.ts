import {CourseDocumentStats} from '@models/course.model';
import {CoursePath} from '@models/path.model';
import {PROTECTED_DOCUMENT_PATH} from 'lib/constants/firestore.path';
import {documentStatsFromSnapshot} from 'lib/data/convert/document-stats-from.snapshot';
import {SourceService} from 'lib/data/base/service.abstract';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentStatSources extends SourceService {

  courseDocumentStat(p: CoursePath) {
    return this.service.fetchObj<CourseDocumentStats>({
      path: PROTECTED_DOCUMENT_PATH(p, 'DOCUMENT_STATS'),
      convert: documentStatsFromSnapshot
    });
  }

  courseDocumentStats(query: { semId: string, batchId?: string, deptId?: string }) {
    return this.service.fetchList<CourseDocumentStats, true>({
      path: 'protected_course_documents',
      colGroupQuery: true,
      convert: documentStatsFromSnapshot,
      query(q) {
        q = q.where('document', '==', 'DOCUMENT_STATS').where('sem', '==', query.semId);

        if (query.batchId)
          q = q.where('batch', '==', query.batchId);
        if (query.deptId)
          q = q.where('dept.' + query.deptId, '!=', false);

        return q;
      }
    });
  }
}
