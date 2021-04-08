import {DOCUMENT_IDS, MARK_DOCUMENT_IDS} from '@lib/constants/document.constants';
import {MarklistEntryRaw, PrivateMarklistMetaRaw} from '@lib/models/document/marklist.model';
import {AttendanceEntryRaw, PrivateAttendanceMetaRaw} from '@lib/models/document/attendance.model';
import {GradingCriteriaEntryUI, PrivateGradingCriteriaMetaRaw} from '@lib/models/document/grading-criteria.model';


export interface BasePrivateMetaRaw {
  editable: boolean,
}


// Document Ids
export type DocumentId = typeof DOCUMENT_IDS[number];
export type MarklistDocumentId = typeof MARK_DOCUMENT_IDS[number];
export type NonGradeDocumentId = MarklistDocumentId | 'ATTENDANCE'
export type PrivateDocumentId = Exclude<DocumentId, 'GRADES'>

export type PrivateMetaRaw = PrivateMarklistMetaRaw | PrivateAttendanceMetaRaw | PrivateGradingCriteriaMetaRaw
export type PrivateEntryUpdate = MarklistEntryRaw | AttendanceEntryRaw | GradingCriteriaEntryUI
