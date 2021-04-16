import {CoursePath} from '@models/path.model';
import {PROTECTED_DOCUMENT_PATH} from 'lib/constants/firestore.path';
import {SourceService} from 'lib/data/base/service.abstract';
import {Injectable} from '@angular/core';
import {StatsDocumentRaw} from '../../models/document/document-stat.model';
import {courseCodeExtract} from '../convert/common';

@Injectable({
  providedIn: 'root'
})
export class DocumentStatSources extends SourceService {

  statsDocument(p: CoursePath) {
    return this.service.fetchObj<StatsDocumentRaw>({
      path: PROTECTED_DOCUMENT_PATH(p, 'DOCUMENT_STATS'),
      convert: courseCodeExtract<StatsDocumentRaw>(),
    });
  }

  statsDocumentQuery(query: { semId: string, batchId?: string, deptId?: string }) {
    return this.service.fetchList<StatsDocumentRaw, true>({
      path: 'protected_course_documents',
      colGroupQuery: true,
      convert: courseCodeExtract<StatsDocumentRaw>(),
      query(q) {
        q = q.where('document', '==', 'DOCUMENT_STATS')
          .where('sem', '==', query.semId);

        if (query.batchId)
          q = q.where('batch', '==', query.batchId);
        if (query.deptId)
          q = q.where('dept.' + query.deptId, '!=', false);

        return q;
      }
    });
  }
}
