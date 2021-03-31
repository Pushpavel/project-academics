import {DocumentPath} from '@lib/models/path.model';
import {Observable} from 'rxjs';
import {DocumentMeta} from '@lib/models/document.model';
import {firestore} from '../../firebase.app';
import {MarklistEntry} from '@lib/models/marklist.model';
import {GradingCriteriaEntry, GradingCriteriaMetaRaw} from '@lib/models/grading.model';
import {AttendanceEntry} from '@lib/models/attendance.model';

export function privateDocumentMetaSink<T extends DocumentMeta | GradingCriteriaMetaRaw>(p: DocumentPath, sink: Observable<Partial<T>>) {
  const ref = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}`);
  return sink.subscribe(metaUpdate => ref.update(metaUpdate));
}

export function privateMarkDocumentEntriesSink(
  p: DocumentPath, sink: Observable<Partial<MarklistEntry> & { rollNo: string }>
) {
  const col = firestore.collection(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}/entries`);
  return sink.subscribe(markEntryUpdate =>
    col.doc(markEntryUpdate.rollNo).update('mark', markEntryUpdate.mark)
  );
}

export function privateAttendanceDocumentEntriesSink(
  p: DocumentPath, sink: Observable<Partial<AttendanceEntry> & { rollNo: string }>
) {
  const col = firestore.collection(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}/entries`);
  return sink.subscribe(attendanceEntryUpdate =>
    col.doc(attendanceEntryUpdate.rollNo).update('attended', attendanceEntryUpdate.attended)
  );
}

export function privateGradingCriteriaEntriesSink(
  p: DocumentPath, sink: Observable<Partial<GradingCriteriaEntry> & { grade: string }>
) {
  const ref = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}`);
  return sink.subscribe(updates => ref.update(`entries.${updates.grade}`, updates.minMark));
}
