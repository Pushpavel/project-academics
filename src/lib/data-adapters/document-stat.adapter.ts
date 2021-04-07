import {CourseDocumentStats} from '@lib/models/document/course.model';
import {CoursePath} from '@lib/models/path.model';
import {fetchList, fetchObj} from '@lib/data-adapters/base/firestore.adapter';
import {PROTECTED_DOCUMENT_PATH} from '@lib/constants/firestore.path';
import {documentStatConvert} from '@lib/data-adapters/convert/document-stat.convert';


export function courseDocumentStat(p: CoursePath) {
  return fetchObj<CourseDocumentStats>({
    path: PROTECTED_DOCUMENT_PATH(p, 'DOCUMENT_STATS'),
    convert: documentStatConvert
  });
}

export function courseDocumentStats(query: { semId: string, batchId?: string, deptId?: string }) {
  return fetchList<CourseDocumentStats>({
    path: 'protected_course_documents',
    colGroupQuery: true,
    convert: documentStatConvert,
    query: q => {

      q = q.where('document', '==', 'DOCUMENT_STATS').where('sem', '==', query.semId);

      if (query.batchId)
        q = q.where('batch', '==', query.batchId);
      if (query.deptId)
        q = q.where('dept.' + query.deptId, '!=', false);

      return q;
    }
  });
}
