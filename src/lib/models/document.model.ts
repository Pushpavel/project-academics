import {DEPT_ABBR} from '@lib/constants/dept.constants';
import DOCUMENT_NAMES from '@lib/constants/document.constants';
import {AttendanceEntry} from '@lib/models/attendance.model';
import {MarklistEntry} from '@lib/models/marklist.model';

export enum DocStatus {PUBLIC, SUBMITTED, PRIVATE, REMARKED}

export type DocumentId = keyof typeof DOCUMENT_NAMES;
export type DocumentName = (typeof DOCUMENT_NAMES)[DocumentId];
export type DocumentEntry = AttendanceEntry | MarklistEntry// TODO: include other entries
export interface DocumentMeta {
  total?: number,
}

export interface DocumentStat {
  semId: string,
  courseCode: string,
  id: DocumentId,
  documentName: DocumentName,
  status: DocStatus,
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


