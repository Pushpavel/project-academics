import {PrivateMetaRaw} from '@lib/models/document/document-base.model';
import {CoursePath} from '@lib/models/path.model';
import {AttendanceEntryRaw} from '@lib/models/document/attendance.model';
import {MarklistEntryRaw} from '@lib/models/document/marklist.model';
import {fetchList, fetchObj} from '@lib/data-adapters/base/firestore.adapter';
import {gradingCriteriaConvert} from '@lib/data-adapters/convert/grading-criteria.convert';
import {PRIVATE_DOCUMENT_PATH} from '@lib/constants/firestore.path';
import {NonGradeDocumentId, PrivateDocumentId} from '@lib/models/document/document-base.model';


export function privateDocumentMeta(p: CoursePath, documentId: PrivateDocumentId) {
  return fetchObj<PrivateMetaRaw>({
    path: PRIVATE_DOCUMENT_PATH({...p, documentId}),
    convert: documentId == 'GRADING_CRITERIA' ? gradingCriteriaConvert : undefined,
  });
}

export function privateDocumentEntries<T extends MarklistEntryRaw | AttendanceEntryRaw>(
  p: CoursePath, documentId: NonGradeDocumentId
) {
  return fetchList<T>({
    path: PRIVATE_DOCUMENT_PATH({...p, documentId}) + `/entries`,
    idField: 'rollNo',
  });
}
