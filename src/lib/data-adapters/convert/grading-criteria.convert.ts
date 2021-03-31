import {converter} from '@lib/data-adapters/base/convert.default';
import {GradingCriteriaMeta, GradingCriteriaMetaRaw} from '@lib/models/grading.model';
import {GRADES} from '@lib/constants/grading.constants';


export const gradingCriteriaConvert = converter<GradingCriteriaMeta>({
  fromFirestore(snap) {
    const data = snap.data() as GradingCriteriaMetaRaw;
    return {
      ...data,
      entries: GRADES.map(grade => {
        const minMark = data.entries[grade];
        const maxMark = data.entries[GRADES[GRADES.indexOf(grade) - 1]] ?? data.total;
        return {grade, minMark, maxMark};
      })
    };
  }
});
