
export interface GradeEntryUI {
  rollNo: string,
  name: string,
  CT1: number,
  CT2: number,
  ASSIGNMENT: number,
  END_SEM: number,
  total: number,
  grade: string,
}

export interface GradeEntryRaw {
  rollNo: string,
  total: number,
  grade: string,
}


export interface GradingCriteriaEntry {
  grade: string,
  minMark: number,
  maxMark: number
}


export interface GradingCriteriaMetaRaw {
  total: number,
  entries: GradingCriteriaEntries
}

export interface GradingCriteriaEntries {
  S: number,
  A: number,
  B: number,
  C: number,
  D: number,
  E: number,
  F: number,
}
