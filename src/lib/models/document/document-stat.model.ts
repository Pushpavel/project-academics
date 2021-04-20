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

/**
 * @deprecated
 */
interface _EntryRaw {
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
export type StatsEntryRaw = EntryRaw

export type StatsDocumentUI = StatsUI
export type StatsEntryUI<T extends DocumentId> = EntryUI<T>

// TODO: replace ZZZ with some other suffix after discussing
// this would represent the firestore document as exactly it is in firestore
export type StatsDocumentZZZ = Omit<StatsDocumentRaw, 'courseCode'>

//  TODO: StatEntryRaw is not Raw
/**
 *  @deprecated
 */
export type _StatEntryRaw = _EntryRaw

