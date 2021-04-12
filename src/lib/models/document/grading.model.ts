import {BaseProtectedMetaRaw, MarklistDocumentId} from '@lib/models/document/document-base.model';

interface EntryRaw {
  rollNo: string,
  total: number,
  grade: string,
}

interface EntryUI extends Partial<EntryRaw & Record<MarklistDocumentId, number>> {
  rollNo: string,
  name: string,
}


export type GradeEntryRaw = EntryRaw;
export type GradeEntryUI = EntryUI;

export type ProtectedGradesMeta = { entries: Record<string, { total: number, grade: string }> } & BaseProtectedMetaRaw
