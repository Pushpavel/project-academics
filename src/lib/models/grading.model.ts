import {GRADES} from '@lib/constants/grading.constants';

export interface GradeEntryRaw {
  rollNo: string,
  total: number,
  grade: string,
}

export interface GradeEntryUI extends GradeEntryRaw {
  name: string,
  CT1: number,
  CT2: number,
  ASSIGNMENT: number,
  END_SEM: number,
}

export interface GradingCriteriaEntryUI {
  grade: string,
  minMark: number,
  maxMark: number
}

export interface GradingCriteriaMeta {
  total: number,
  entries: GradingCriteriaEntryUI[],
}

export interface GradingCriteriaMetaRaw {
  total: number,
  entries: Record<typeof GRADES[number], number>
}
