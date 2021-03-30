import {DocumentId, DocumentMeta} from '@lib/models/document.model';
import {GradeEntryUI, GradingCriteriaEntry} from '@lib/models/grading.model';
import {MarklistEntry} from '@lib/models/marklist.model';
import {mapMapEntries} from '@lib/utils/other.util';

export function computeGradeEntryUIModels(
  criteriaMeta: DocumentMeta,
  criteriaEntries: GradingCriteriaEntry[],
  markEntries: Map<DocumentId, MarklistEntry[]>,
  studentNames: Map<string, string>
) {

  const markEntriesMap = mapMapEntries(markEntries,
    (documentId, marklist) => [documentId, new Map(marklist.map(entry => [entry.rollNo, entry]))]
  );

  return [...studentNames.keys()].map(rollNo => {
    const entry: any = {rollNo, total: 0, name: studentNames.get(rollNo) ?? 'Error'}; // TODO: Handle this
    for (const docId of markEntries.keys()) {
      entry[docId] = markEntriesMap.get(docId)?.get(rollNo) ?? -1; // TODO: Handle this
      entry.total += entry[docId];
    }
    //  TODO: Compute Grade using criteriaMeta and criteriaEntries
    entry.grade = 'S';
    return entry as GradeEntryUI;
  });
}
