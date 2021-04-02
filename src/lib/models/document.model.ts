import {DEPT_ABBR} from '@lib/constants/dept.constants';
import {DOCUMENT_IDS, MARK_DOCUMENT_IDS} from '@lib/constants/document.constants';
import {AttendanceEntryRaw} from '@lib/models/attendance.model';
import {MarklistEntryRaw} from '@lib/models/marklist.model';

export type DocumentId = typeof DOCUMENT_IDS[number];
export type MarklistDocumentId = typeof MARK_DOCUMENT_IDS[number];
export type PrivateDocumentId = Exclude<DocumentId, 'GRADES'>

export type DocumentStatus = 'public' | 'submitted' | 'private' | 'remarked'

export type DocumentEntry = AttendanceEntryRaw | MarklistEntryRaw// TODO: include other entries

export interface DocumentMetaRaw {
  total?: number,
  editable?: boolean,
}

export interface PrivateDocumentMetaRaw extends DocumentMetaRaw {
  total: number,
  editable: boolean
}

export interface DocumentStat {
  semId: string,
  courseCode: string,
  id: DocumentId,
  documentName: string,
  status: DocumentStatus,
  timestamp?: number,
}

export interface StatsDocumentRaw extends Partial<DeptFieldsRaw> {
  sem: string,
  batch: string,
  courseName: string,
  status: string,
  entries: {
    [docId in DocumentId]: {
      status: string,
      timestamp?: number,
    }
  }
}


export type DeptFieldsRaw = {
  [dept in keyof typeof DEPT_ABBR]: 'core' | 'elective1' | 'elective2';
};


