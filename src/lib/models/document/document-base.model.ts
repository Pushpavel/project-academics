import {DOCUMENT_IDS, MARK_DOCUMENT_IDS} from '@lib/constants/document.constants';
import {PrivateMarklistMetaRaw} from '@lib/models/document/marklist.model';
import {PrivateAttendanceMetaRaw} from '@lib/models/document/attendance.model';
import {PrivateGradingCriteriaMetaRaw} from '@lib/models/document/grading-criteria.model';


export interface BasePrivateMetaRaw {
  editable: boolean,
}


// Document Ids
export type DocumentId = typeof DOCUMENT_IDS[number];
export type MarklistDocumentId = typeof MARK_DOCUMENT_IDS[number];
export type NonGradeDocumentId = MarklistDocumentId | 'ATTENDANCE'
export type PrivateDocumentId = Exclude<DocumentId, 'GRADES'>

export type PrivateMetaRaw = PrivateMarklistMetaRaw | PrivateAttendanceMetaRaw | PrivateGradingCriteriaMetaRaw
