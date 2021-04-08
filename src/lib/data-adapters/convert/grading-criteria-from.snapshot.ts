import {fromFirestore} from '@lib/data-adapters/base/convert.default';
import {
  PrivateGradingCriteriaMeta,
  PrivateGradingCriteriaMetaRaw
} from '@lib/models/document/grading-criteria.model';
import {GRADES} from '@lib/constants/grading.constants';


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
