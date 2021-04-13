import {DeptFields, DocumentId} from './document-base.model';


interface StatsRaw extends Partial<DeptFields> {
  sem: string,
  batch: string,
  courseName: string,
  status: string,
  entries: {
    [docId in DocumentId]:
    {
      status: DocumentStatus,
      timestamp?: number,
    } | undefined
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
export type StatsDocumentRaw = StatsRaw
export type StatEntryRaw = EntryRaw
