import {BaseMetaZZZMap, EntryZZZMap, PublicDocumentId} from './document/document-base.model';

export interface StudentsDocumentRaw {
  entries: Record<string, string>
}

interface ZZZ {
  sem: string,
  rollNo: string,
  batch: string,
  credits: number,
  courseName: string,
  entries: {
    [docId in PublicDocumentId]?: EntryZZZ<docId>
  }
}

interface Raw extends ZZZ {
  courseCode: string,
}

type UI = Omit<ZZZ, 'entries'> & {
  entries: {
    [docId in PublicDocumentId]: Partial<EntryZZZ<docId>> & { documentId: PublicDocumentId }
  }
}

interface Result extends Raw {
  entries: Required<Raw['entries']>
}


type EntryZZZ<ID extends PublicDocumentId> = BaseMetaZZZMap[ID] & EntryZZZMap[ID] & { publicTimestamp: number };

export type StudentEntryZZZ<ID extends PublicDocumentId> = EntryZZZ<ID>

export type StudentZZZ = ZZZ;
export type StudentRaw = Raw;
export type StudentUI = UI;
export type StudentResult = Result;
