import {GRADES} from '@lib/constants/grading.constants';
import {PrivateDocumentMetaRaw} from '@lib/models/document.model';

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

export type PrivateGradingCriteriaMeta = GradingCriteriaMeta & PrivateDocumentMetaRaw
export type PrivateGradingCriteriaMetaRaw = GradingCriteriaMetaRaw & PrivateDocumentMetaRaw

