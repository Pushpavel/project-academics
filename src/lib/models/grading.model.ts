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


export interface GradingCriteriaMetaRaw {
  total: number,
  entries: GradingCriteriaEntriesRaw
}

export interface GradingCriteriaEntriesRaw {
  S: number,
  A: number,
  B: number,
  C: number,
  D: number,
  E: number,
  F: number,
}
