import {ProtectedGradingCriteriaMetaRaw} from '@models/document/grading-criteria.model';
import {ProtectedMarklistMetaRaw} from '@models/document/marklist.model';
import {GRADES} from '../constants/grading.constants';

export function computeGrade(total: number, criteria: ProtectedGradingCriteriaMetaRaw) {
  for (const grade of GRADES)
    if (criteria.entries[grade] <= total)
      return grade;

  return 'below F'; // TODO: whats below F?
}

export function computePartialTotal(metas: ProtectedMarklistMetaRaw[]) {
  const totalMap = new Map<string, number>();

  for (const rollNo of Object.keys(metas[0].entries)) {
    let total = 0;
    for (const meta of metas)
      total += meta.entries[rollNo];
    totalMap.set(rollNo, total);
  }

  return totalMap;
}
