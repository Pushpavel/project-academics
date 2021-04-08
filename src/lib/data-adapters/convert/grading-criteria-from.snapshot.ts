import {fromFirestore} from '@lib/data-adapters/base/convert.default';
import {
  GradingCriteriaEntryUI,
  PrivateGradingCriteriaMeta,
  PrivateGradingCriteriaMetaRaw
} from '@lib/models/document/grading-criteria.model';
import {GRADES} from '@lib/constants/grading.constants';
import {SinkUpdate} from '@lib/data-adapters/base/sink.interfaces';


export const gradingCriteriaFromSnapshot: fromFirestore<PrivateGradingCriteriaMeta> =
  (snap) => {
    const data = snap.data() as PrivateGradingCriteriaMetaRaw;
    return {
      ...data,
      entries: GRADES.map(grade => {
        const minMark = data.entries[grade];
        const maxMark = data.entries[GRADES[GRADES.indexOf(grade) - 1]] ?? data.total;
        return {grade, minMark, maxMark};
      })
    };
  };

export function gradingCriteriaMetaUpdateFromEntries(
  entries: SinkUpdate<GradingCriteriaEntryUI, 'grade' | 'minMark'>[]
): SinkUpdate<PrivateGradingCriteriaMetaRaw, never>[] {

  const entriesData: Record<string, number> = {};

  for (const entry of entries) entriesData['entries.' + entry.grade] = entry.minMark;

  return [entriesData];
}
