import {DocMeta} from '@lib/models/document.model';

export interface GradeEntry {
  rollNo: string,
  name: string,
  CT1: number,
  CT2: number,
  ASSIGNMENT: number,
  END_SEM: number,
  TOTAL: number,
  GRADE: string,
}

export interface GradesDocMeta extends DocMeta {
  gradingCriteria?: GradingCriteria
}

interface GradingCriteria {
  S: number,
  A: number,
  // TODO: Implement this
}
