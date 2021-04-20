import firebase from 'firebase/app';
import {DeptFields, DocumentId} from './document-base.model';
import Timestamp = firebase.firestore.Timestamp;


interface StatsRaw {
  sem: string,
  batch: string,
  courseName: string,
  courseCode: string,// computed
  document: 'DOCUMENT_STATS',
  dept: DeptFields,
  entries: {
    [docId in DocumentId]?: EntryRaw
  },
}

type EntryRaw = { status?: DocumentStatus } & Partial<Record<DocumentStatusTimestamp, Timestamp>>;


interface StatsUI extends StatsRaw {
  entries: {
    [docId in DocumentId]: EntryUI<docId>
  }
}

interface EntryUI<T extends DocumentId> extends EntryRaw {
  status: DocumentStatus,
  documentId: T,
}

export type DocumentStatus = 'public' | 'submitted' | 'private' | 'remarked'
export type DocumentStatusTimestamp = `${DocumentStatus}Timestamp`;

export type StatsDocumentRaw = StatsRaw
export type StatsEntryRaw = EntryRaw

export type StatsDocumentUI = StatsUI
export type StatsEntryUI<T extends DocumentId> = EntryUI<T>

export type StatsDocumentZZZ = Omit<StatsDocumentRaw, 'courseCode'>

