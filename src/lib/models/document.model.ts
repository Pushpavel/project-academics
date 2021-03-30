import {DEPT_ABBR} from '@lib/constants/dept.constants';
import DOCUMENT_NAMES from '@lib/constants/document.constants';

export enum DocStatus {PUBLIC, SUBMITTED, PRIVATE, REMARKED}

export interface DocMeta {
  status: DocStatus,
  timestamp: number
}

export interface DocumentStat {
  semId: string,
  courseCode: string,
  id: string,
  documentName: string,
  status: DocStatus,
  timestamp?: number,
}

export interface StatsDocumentRaw extends Partial<DeptFieldsRaw & StatFieldsRaw> {
  sem: string,
  batch: string,
  courseName: string,
  status: string,
}

export type StatFieldsRaw = {
  [docId in keyof typeof DOCUMENT_NAMES]: {
    status: string,
    timestamp?: number,
  }
}

export type DeptFieldsRaw = {
  [dept in keyof typeof DEPT_ABBR]: 'core' | 'elective1' | 'elective2';
};


