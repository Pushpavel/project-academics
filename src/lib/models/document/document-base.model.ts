import {DEPT_ABBR} from '../../constants/dept.constants';
import {DOCUMENT_IDS, MARK_DOCUMENT_IDS} from '../../constants/document.constants';
import {PrivateMarklistMetaRaw, ProtectedMarklistMetaRaw} from './marklist.model';
import {PrivateAttendanceMetaRaw, ProtectedAttendanceMetaRaw} from './attendance.model';
import {PrivateGradingCriteriaMetaRaw, ProtectedGradingCriteriaMetaRaw} from './grading-criteria.model';
import {ProtectedGradesMetaRaw} from './grading.model';


export interface BasePrivateMetaRaw {
  editable: boolean,
}

export interface BaseProtectedMetaRaw {
  document: DocumentId,
}


// Document Ids
export type DocumentId = typeof DOCUMENT_IDS[number];
export type MarklistDocumentId = typeof MARK_DOCUMENT_IDS[number];
export type NonGradeDocumentId = MarklistDocumentId | 'ATTENDANCE'
export type PrivateDocumentId = Exclude<DocumentId, 'GRADES'>

export type DeptId = keyof typeof DEPT_ABBR;
export type DeptFields = { [dept in DeptId]?: 'core' | 'elective1' | 'elective2'; };


export type PrivateMetaRaw = PrivateMarklistMetaRaw | PrivateAttendanceMetaRaw | PrivateGradingCriteriaMetaRaw
export type ProtectedMetaRaw = ProtectedMarklistMetaRaw
  | ProtectedAttendanceMetaRaw
  | ProtectedGradingCriteriaMetaRaw
  | ProtectedGradesMetaRaw

export function isPrivateMeta<PM extends PrivateMetaRaw>(meta: BasePrivateMetaRaw | BaseProtectedMetaRaw): meta is PM {
  return meta.hasOwnProperty('editable');
}
