import {BasePrivateMetaRaw, BaseProtectedMetaRaw} from './document-base.model';

interface EntryRaw {
  rollNo: string,
  mark: number,
}

interface EntryUI extends EntryRaw {
  name: string,
}

interface MetaRaw {
  total: number
}

export type MarklistEntryRaw = EntryRaw;
export type MarklistEntryUI = EntryUI;
export type ProtectedMarklistMetaRaw = MetaRaw & { entries: Record<string, number> } & BaseProtectedMetaRaw
export type PrivateMarklistMetaRaw = MetaRaw & BasePrivateMetaRaw
export type MarklistMetaRaw = ProtectedMarklistMetaRaw | PrivateMarklistMetaRaw;
