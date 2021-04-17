import {BaseMetaZZZMap, EntryZZZMap, PublicDocumentId} from './document/document-base.model';

/**
 * @deprecated
 */
export interface StudentMarkEntry {
  documentId: string,
  documentName: string,
  mark: number,
  totalMark: number,
  timestamp: number
}

/**
 * @deprecated
 */
export interface StudentAttendanceEntry {
  percentage: number,
  attendedClasses: number,
  totalClasses: number,
  timestamp: number
}

/**
 * @deprecated
 */
export interface StudentSemResult {
  credits: number,
  gpa: number
}


export interface StudentCourseResult {
  courseName: string,
  code: string,
  grade: string,
  credits: number,
}

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

type EntryZZZ<ID extends PublicDocumentId> = BaseMetaZZZMap[ID] & EntryZZZMap[ID] & { publicTimestamp: number };

export type StudentZZZ = ZZZ;
