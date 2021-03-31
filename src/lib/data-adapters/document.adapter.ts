import {DocumentEntry, DocumentMetaRaw} from '@lib/models/document.model';
import {firestore} from '../../firebase.app';
import {collectionData, docData} from 'rxfire/firestore';
import {DocumentPath} from '@lib/models/path.model';
import {map} from 'rxjs/operators';
import {GradingCriteriaEntryUI, GradingCriteriaMetaRaw} from '@lib/models/grading.model';
import {GRADING_CRITERIA_ORDER} from '@lib/constants/grading.constants';
import {Observable} from 'rxjs';
import {AttendanceEntryRaw, AttendanceEntryUI} from '@lib/models/attendance.model';
import {MarklistEntryRaw, MarklistEntryUI} from '@lib/models/marklist.model';

export function privateDocumentMeta(p: DocumentPath) {
  const ref = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}`);
  return docData<DocumentMetaRaw>(ref);
}

export function privateRollNoEntries<T extends DocumentEntry>(p: DocumentPath) {
  const col = firestore.collection(`semesters/${p.semId}/courses/${p.courseCode}/private_course_documents/${p.documentId}/entries`);
  return collectionData<T>(col, 'rollNo');
}

export function gradingCriteriaDocument(p: DocumentPath, isPrivate: boolean): Observable<[DocumentMetaRaw, GradingCriteriaEntryUI[]]> {
  const docCol = isPrivate ? 'private_course_documents' : 'protected_course_documents';
  const ref = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}/${docCol}/GRADING_CRITERIA`);
  return docData<GradingCriteriaMetaRaw>(ref).pipe(
    map(meta =>
      [
        {total: meta.total} as DocumentMetaRaw,
        GRADING_CRITERIA_ORDER.map(grade => {
          const minMark = meta.entries[grade];
          const maxMark = meta.entries[GRADING_CRITERIA_ORDER[GRADING_CRITERIA_ORDER.indexOf(grade) - 1]] ?? meta.total;
          return {grade, minMark, maxMark} as GradingCriteriaEntryUI;
        }),
      ]
    )
  );
}

export function attendanceEntryUIModels(entries: AttendanceEntryRaw[], meta: DocumentMetaRaw, studentNames: Map<string, string>) {
  return entries.map(entry => ({
    ...entry,
    percentage: (100 * entry.attended / (meta.total ?? -1)).toString() + '%',// TODO: Handle These
    name: studentNames.get(entry.rollNo) ?? 'Error'
  })) as AttendanceEntryUI[];
}

export function marklistEntryUIModels(entries: MarklistEntryRaw[], studentNames: Map<string, string>): MarklistEntryUI[] {
  return entries.map(entry => ({
    ...entry,
    name: studentNames.get(entry.rollNo) ?? 'Error' // TODO: Handle this
  }));
}
