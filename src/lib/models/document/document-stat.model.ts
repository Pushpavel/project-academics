import {DEPT_ABBR} from '@lib/constants/dept.constants';
import {DocumentId} from '@lib/models/document/document-base.model';


type DeptFields = { [dept in keyof typeof DEPT_ABBR]: 'core' | 'elective1' | 'elective2'; };

interface StatsRaw extends Partial<DeptFields> {
  sem: string,
  batch: string,
  courseName: string,
  status: string,
  entries: {
    [docId in DocumentId]: {
      status: string,
      timestamp?: number,
    }
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
