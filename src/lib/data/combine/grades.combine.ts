import {MarklistDocumentId, ProtectedMetaRaw} from '@models/document/document-base.model';
import {GradeEntryUI, ProtectedGradesMeta} from '@models/document/grading.model';
import {MARK_DOCUMENT_IDS} from '@constants/document.constants';
import {ProtectedMarklistMetaRaw} from '@models/document/marklist.model';
import {ProtectedGradingCriteriaMetaRaw} from '@models/document/grading-criteria.model';
import {GRADES} from '@constants/grading.constants';

export function gradesUIModel([metas, studentNames]: [ProtectedMetaRaw[], Map<string, string>]): GradeEntryUI[] {
  const entries = [];

  // iterate all rollNos
  for (const rollNo of studentNames.keys()) {
    // create entry for each rollNo with available mark data
    const entry: GradeEntryUI = {rollNo, name: studentNames.get(rollNo) ?? 'Error'}; // TODO: handle this
    let total = 0;

    for (const meta of metas)
      if (MARK_DOCUMENT_IDS.includes(meta.document as any)) {
        const mark = (meta as ProtectedMarklistMetaRaw).entries[rollNo];
        total += mark ?? 0;
        entry[meta.document as MarklistDocumentId] = mark;
      }

    entry.total = total;
    entries.push(entry);
  }

  // if any of the mark document is missing don't bother about grades
  if (!MARK_DOCUMENT_IDS.every(id => metas.find(meta => meta.document == id)))
    return entries;

  const gradingCriteria = metas.find(meta => meta.document == 'GRADING_CRITERIA');

  // if grading criteria is missing don't bother about grades
  if (!gradingCriteria)
    return entries;

  const grades = metas.find(meta => meta.document == 'GRADES');

  // compute grades if not present else include the available grade and total data
  if (!grades)
    return computeGrades(entries, gradingCriteria as ProtectedGradingCriteriaMetaRaw);
  else {
    return entries.map(entry => {
      return {
        ...entry,
        ...(grades as ProtectedGradesMeta).entries[entry.rollNo]
      };
    });
  }

}

export function computeGrades(entries: GradeEntryUI[], criteria: ProtectedGradingCriteriaMetaRaw) {
  return entries.map(entry => {
    for (const grade of GRADES) {
      if (criteria.entries[grade] <= (entry.total ?? 0)) {
        entry.grade = grade;
        break;
      }
    }
    if (!entry.grade) entry.grade = 'below F'; // TODO: whats below F?
    return entry;
  });
}
