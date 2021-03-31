import {DocumentMetaRaw, MarklistDocumentId, PrivateDocumentId, PrivateDocumentMetaRaw} from '@lib/models/document.model';
import {firestore} from '../../firebase.app';
import {docData} from 'rxfire/firestore';
import {CoursePath, DocumentPath} from '@lib/models/path.model';
import {map} from 'rxjs/operators';
import {GradingCriteriaEntryUI, GradingCriteriaMeta, GradingCriteriaMetaRaw} from '@lib/models/grading.model';
import {GRADES} from '@lib/constants/grading.constants';
import {Observable} from 'rxjs';
import {AttendanceEntryUI} from '@lib/models/attendance.model';
import {MarklistEntryUI} from '@lib/models/marklist.model';
import {fetchList, fetchObj} from '@lib/data-adapters/base/firestore.adapter';
import {gradingCriteriaConvert} from '@lib/data-adapters/convert/grading-criteria.convert';
import firebase from 'firebase/app';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;
import {privateAttendanceEntryConvert} from '@lib/data-adapters/convert/attendance.convert';
import {privateMarklistEntryConvert} from '@lib/data-adapters/convert/marklist.convert';

//  Type definitions
type MetaType<P extends PrivateDocumentId> = P extends 'GRADING_CRITERIA' ? GradingCriteriaMeta : PrivateDocumentMetaRaw


export function privateDocumentMeta<P extends PrivateDocumentId, M extends MetaType<P>>(p: DocumentPath<P>) {
  return fetchObj<M>({
    path: `semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}`,
    convert: (p.documentId == 'GRADING_CRITERIA' ? gradingCriteriaConvert : undefined) as FirestoreDataConverter<M>,
  });
}


export function privateMarklistEntries<P extends MarklistDocumentId>(
  p: DocumentPath<MarklistDocumentId>,
  studentNames: Map<string, string>
) {
  return fetchList<MarklistEntryUI>({
    path: `semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}/entries`,
    idField: 'rollNo',
    convert: privateMarklistEntryConvert(studentNames)
  });
}

export function privateAttendanceEntries(p: CoursePath, studentNames: Map<string, string>, meta: PrivateDocumentMetaRaw) {
  return fetchList<AttendanceEntryUI>({
    path: `semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/ATTENDANCE/entries`,
    idField: 'rollNo',
    convert: privateAttendanceEntryConvert(studentNames, meta)
  });
}

export function gradingCriteriaDocument(p: DocumentPath, isPrivate: boolean): Observable<[DocumentMetaRaw, GradingCriteriaEntryUI[]]> {
  const docCol = isPrivate ? 'private_course_documents' : 'protected_course_documents';
  const ref = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}/${docCol}/GRADING_CRITERIA`);
  return docData<GradingCriteriaMetaRaw>(ref).pipe(
    map(meta =>
      [
        {total: meta.total} as DocumentMetaRaw,
        GRADES.map(grade => {
          const minMark = meta.entries[grade];
          const maxMark = meta.entries[GRADES[GRADES.indexOf(grade) - 1]] ?? meta.total;
          return {grade, minMark, maxMark} as GradingCriteriaEntryUI;
        }),
      ]
    )
  );
}
