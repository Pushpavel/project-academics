import {DOCUMENT_IDS, MARK_DOCUMENT_IDS} from '@lib/constants/document.constants';
import {PrivateMarklistMetaRaw, ProtectedMarklistMetaRaw} from '@lib/models/document/marklist.model';
import {PrivateAttendanceMetaRaw, ProtectedAttendanceMetaRaw} from '@lib/models/document/attendance.model';
import {PrivateGradingCriteriaMetaRaw, ProtectedGradingCriteriaMetaRaw} from '@lib/models/document/grading-criteria.model';
import {DEPT_ABBR} from '@lib/constants/dept.constants';
import {ProtectedGradesMeta} from '@lib/models/document/grading.model';


export interface BasePrivateMetaRaw {
  editable: boolean,
}


// Document Ids
export type DocumentId = typeof DOCUMENT_IDS[number];
export type MarklistDocumentId = typeof MARK_DOCUMENT_IDS[number];
export type NonGradeDocumentId = MarklistDocumentId | 'ATTENDANCE'
export type PrivateDocumentId = Exclude<DocumentId, 'GRADES'>

export type DeptId = keyof typeof DEPT_ABBR;
export type DeptFields = { [dept in DeptId]: 'core' | 'elective1' | 'elective2'; };


export type PrivateMetaRaw = PrivateMarklistMetaRaw | PrivateAttendanceMetaRaw | PrivateGradingCriteriaMetaRaw
export type ProtectedMetaRaw = ProtectedAttendanceMetaRaw | ProtectedMarklistMetaRaw | ProtectedGradingCriteriaMetaRaw | ProtectedGradesMeta
