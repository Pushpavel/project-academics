import {GRADES} from '@lib/constants/grading.constants';
import {BasePrivateMetaRaw, BaseProtectedMetaRaw} from './document-base.model';

interface EntryUI {
  grade: GradeId,
  minMark: number,
  maxMark: number
}

interface Meta {
  total: number,
  entries: GradingCriteriaEntryUI[],
}


interface MetaRaw {
  total: number,
  entries: Record<GradeId, number>
}

export type GradeId = typeof GRADES[number];
export type GradingCriteriaEntryUI = EntryUI
export type GradingCriteriaMeta = Meta
export type ProtectedGradingCriteriaMetaRaw = MetaRaw & BaseProtectedMetaRaw
export type PrivateGradingCriteriaMeta = Meta & BasePrivateMetaRaw
export type PrivateGradingCriteriaMetaRaw = MetaRaw & BasePrivateMetaRaw
