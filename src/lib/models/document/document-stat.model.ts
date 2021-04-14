import {DeptFields, DocumentId} from './document-base.model';


interface StatsRaw {
  sem: string,
  batch: string,
  courseName: string,
  dept: DeptFields,
  entries: {
    [docId in DocumentId]?: { status?: DocumentStatus } & Partial<Record<DocumentStatusTimestamp, number>>
  },
}

interface EntryRaw {
  semId: string,
  courseCode: string,
  id: DocumentId,
  documentName: string,
  status: DocumentStatus,
  timestamp?: number,
}


export type DocumentStatus = 'public' | 'submitted' | 'private' | 'remarked'
export type DocumentStatusTimestamp = `${DocumentStatus}Timestamp`;
export type StatsDocumentRaw = StatsRaw
//  TODO: StatEntryRaw is not Raw
export type StatEntryRaw = EntryRaw
