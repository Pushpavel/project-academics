import {CoursePath, DocumentPath} from '@lib/models/path.model';
import {PrivateDocumentId, PrivateMetaRaw} from '@lib/models/document/document-base.model';
import {firestore} from '../../firebase.app';
import {MarklistEntryRaw} from '@lib/models/document/marklist.model';
import {AttendanceEntryRaw} from '@lib/models/document/attendance.model';
import {ListSink, Sink} from '@lib/data-adapters/base/sink.interfaces';
import {GradingCriteriaEntryUI} from '@lib/models/document/grading-criteria.model';


export function privateDocumentEntriesSink<T extends MarklistEntryRaw | AttendanceEntryRaw>(
  p: DocumentPath<Exclude<PrivateDocumentId, 'GRADING_CRITERIA'>>,
  sink: ListSink<T, 'rollNo'>
) {
  const col = firestore.collection(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}/entries`);
  return sink.subscribe(markEntryUpdate => {
    const update: Partial<T> = {...markEntryUpdate};
    delete update.rollNo;
    return col.doc(markEntryUpdate.rollNo).update(update);
  });
}


export function privateDocumentMetaSink<T extends PrivateMetaRaw>(p: DocumentPath, sink: Sink<T>) {
  const ref = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}`);
  return sink.subscribe(metaUpdate => ref.update(metaUpdate));
}

export function privateGradingCriteriaEntriesSink(
  p: CoursePath, sink: ListSink<GradingCriteriaEntryUI, 'grade'>
) {
  const ref = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/GRADING_CRITERIA`);
  return sink.subscribe(updates => ref.update(`entries.${updates.grade}`, updates.minMark));
}
