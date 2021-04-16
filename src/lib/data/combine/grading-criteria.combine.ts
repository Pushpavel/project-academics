import {GRADES} from '../../constants/grading.constants';
import {
  GradingCriteriaEntryUI,
  GradingCriteriaMetaRaw
} from '../../models/document/grading-criteria.model';
import {mapObjectEntries} from '../../utils/native/map.utils';

export function gradingCriteriaUIEntriesFromMeta(meta: GradingCriteriaMetaRaw): GradingCriteriaEntryUI[] {
  const entries = mapObjectEntries(meta.entries, (grade, minMark) => {
    const maxMark = meta.entries[GRADES[GRADES.indexOf(grade) - 1]] ?? meta.total;
    return {
      grade,
      minMark,
      maxMark,
    };
  });

  // arrange entries in the GRADES order
  return GRADES.map(grade => {
    const entry = entries.find(entry => entry.grade == grade);
    if (!entry)
      throw new Error('No entry Found'); // TODO: handle this

    return entry;
  });
}
