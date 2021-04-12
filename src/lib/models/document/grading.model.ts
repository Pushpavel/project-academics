interface EntryRaw {
  rollNo: string,
  total: number,
  grade: string,
}

interface EntryUI extends EntryRaw {
  name: string,
  CT1: number,
  CT2: number,
  ASSIGNMENT: number,
  END_SEM: number,
}


export type GradeEntryRaw = EntryRaw;
export type GradeEntryUI = EntryUI;

export type ProtectedGradesMeta = { entries: Record<string, { total: number, grade: string }> }
