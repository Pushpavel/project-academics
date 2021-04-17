import {BaseProtectedMetaRaw, MarklistDocumentId} from './document-base.model';

interface EntryRaw {
  rollNo: string,
  total: number,
  grade: string,
}

interface EntryUI extends Partial<EntryRaw & Record<MarklistDocumentId, number>> {
  rollNo: string,
  name: string,
}


export type GradeEntryZZZ = Omit<EntryRaw, 'rollNo'>
export type GradeEntryRaw = EntryRaw;
export type GradeEntryUI = EntryUI;

export type ProtectedGradesMetaRaw = { entries: Record<string, { total: number, grade: string }> } & BaseProtectedMetaRaw
