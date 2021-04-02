import {MarklistDocumentId, PrivateDocumentId, PrivateDocumentMetaRaw} from '@lib/models/document.model';
import {CoursePath, DocumentPath} from '@lib/models/path.model';
import {PrivateGradingCriteriaMeta} from '@lib/models/grading.model';
import {AttendanceEntryRaw} from '@lib/models/attendance.model';
import {MarklistEntryRaw} from '@lib/models/marklist.model';
import {fetchList, fetchObj} from '@lib/data-adapters/base/firestore.adapter';
import {gradingCriteriaConvert} from '@lib/data-adapters/convert/grading-criteria.convert';
import firebase from 'firebase/app';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

//  Type definitions
type MetaType<P extends PrivateDocumentId> = P extends 'GRADING_CRITERIA' ? PrivateGradingCriteriaMeta : PrivateDocumentMetaRaw


export function privateDocumentMeta<P extends PrivateDocumentId, M extends MetaType<P>>(p: DocumentPath<P>) {
  return fetchObj<M>({
    path: `semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}`,
    convert: (p.documentId == 'GRADING_CRITERIA' ? gradingCriteriaConvert : undefined) as FirestoreDataConverter<M>,
  });
}


export function privateMarklistEntries<T extends MarklistDocumentId = any>(p: DocumentPath<T>) {
  return fetchList<MarklistEntryRaw>({
    path: `semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}/entries`,
    idField: 'rollNo',
  });
}

export function privateAttendanceEntries(p: CoursePath) {
  return fetchList<AttendanceEntryRaw>({
    path: `semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/ATTENDANCE/entries`,
    idField: 'rollNo'
  });
}
