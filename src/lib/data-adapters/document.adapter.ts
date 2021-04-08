import {PrivateMetaRaw} from '@lib/models/document/document-base.model';
import {CoursePath} from '@lib/models/path.model';
import {AttendanceEntryRaw} from '@lib/models/document/attendance.model';
import {MarklistEntryRaw} from '@lib/models/document/marklist.model';
import {fetchList, fetchObj} from '@lib/data-adapters/base/firestore.adapter';
import {gradingCriteriaFromSnapshot} from '@lib/data-adapters/convert/grading-criteria-from.snapshot';
import {PRIVATE_DOCUMENT_PATH} from '@lib/constants/firestore.path';
import {NonGradeDocumentId, PrivateDocumentId} from '@lib/models/document/document-base.model';


/**
 * fetches the firestore document that represents the Meta data of an Academic Document at location given by the params
 * @param p CoursePath object
 * @param documentId academic document id
 */
export function privateDocumentMeta<T extends PrivateMetaRaw>(p: CoursePath, documentId: PrivateDocumentId) {
  let convert;

  if (documentId == 'GRADING_CRITERIA')
    convert = gradingCriteriaFromSnapshot;

  return fetchObj<T>({
    path: PRIVATE_DOCUMENT_PATH({...p, documentId}),
    convert: convert as any,
    once: true,
  });
}

/**
 * fetches all firestore documents in sub-collection 'entries' of an academic document at location given by params
 * @param p CoursePath object
 * @param documentId academic document id
 */
export function privateDocumentEntries<T extends MarklistEntryRaw | AttendanceEntryRaw>(
  p: CoursePath, documentId: NonGradeDocumentId
) {
  return fetchList<T>({
    path: PRIVATE_DOCUMENT_PATH({...p, documentId}) + `/entries`,
    idField: 'rollNo',
    once: true,
  });
}
