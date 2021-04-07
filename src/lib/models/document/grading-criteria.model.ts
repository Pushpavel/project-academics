import {GRADES} from '@lib/constants/grading.constants';
import {BasePrivateMetaRaw} from '@lib/models/document/document-base.model';

interface EntryUI {
  grade: string,
  minMark: number,
  maxMark: number
}

interface Meta {
  total: number,
  entries: GradingCriteriaEntryUI[],
}


interface MetaRaw {
  total: number,
  entries: Record<typeof GRADES[number], number>
}


export type GradingCriteriaEntryUI = EntryUI
export type GradingCriteriaMeta = Meta
export type GradingCriteriaMetaRaw = MetaRaw
export type PrivateGradingCriteriaMeta = GradingCriteriaMeta & BasePrivateMetaRaw
export type PrivateGradingCriteriaMetaRaw = GradingCriteriaMetaRaw & BasePrivateMetaRaw
