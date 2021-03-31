import {DocumentPath} from '@lib/models/path.model';
import {Observable} from 'rxjs';
import {DocumentMetaRaw} from '@lib/models/document.model';
import {firestore} from '../../firebase.app';
import {MarklistEntryRaw} from '@lib/models/marklist.model';
import {GradingCriteriaEntryUI, GradingCriteriaMetaRaw} from '@lib/models/grading.model';
import {AttendanceEntryRaw} from '@lib/models/attendance.model';

export function privateDocumentMetaSink<T extends DocumentMetaRaw | GradingCriteriaMetaRaw>(p: DocumentPath, sink: Observable<Partial<T>>) {
  const ref = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}`);
  return sink.subscribe(metaUpdate => ref.update(metaUpdate));
}

export function privateMarkDocumentEntriesSink(
  p: DocumentPath, sink: Observable<Partial<MarklistEntryRaw> & { rollNo: string }>
) {
  const col = firestore.collection(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}/entries`);
  return sink.subscribe(markEntryUpdate =>
    col.doc(markEntryUpdate.rollNo).update('mark', markEntryUpdate.mark)
  );
}

export function privateAttendanceDocumentEntriesSink(
  p: DocumentPath, sink: Observable<Partial<AttendanceEntryRaw> & { rollNo: string }>
) {
  const col = firestore.collection(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}/entries`);
  return sink.subscribe(attendanceEntryUpdate =>
    col.doc(attendanceEntryUpdate.rollNo).update('attended', attendanceEntryUpdate.attended)
  );
}

export function privateGradingCriteriaEntriesSink(
  p: DocumentPath, sink: Observable<Partial<GradingCriteriaEntryUI> & { grade: string }>
) {
  const ref = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}`);
  return sink.subscribe(updates => ref.update(`entries.${updates.grade}`, updates.minMark));
}
