import {
  GradingCriteriaEntryUI,
  PrivateGradingCriteriaMetaRaw
} from '@models/document/grading-criteria.model';
import {SinkUpdate} from 'lib/data/base/sink.interfaces';


export function gradingCriteriaMetaUpdateFromEntries(
  entries: SinkUpdate<GradingCriteriaEntryUI, 'grade' | 'minMark'>[]
): SinkUpdate<PrivateGradingCriteriaMetaRaw, never>[] {

  const entriesData: Record<string, number> = {};

  for (const entry of entries) entriesData['entries.' + entry.grade] = entry.minMark;

  return [entriesData];
}
