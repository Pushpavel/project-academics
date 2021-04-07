import {BasePrivateMetaRaw} from '@lib/models/document/document-base.model';

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
export type PublicMarklistMetaRaw = MetaRaw
export type PrivateMarklistMetaRaw = MetaRaw & BasePrivateMetaRaw
