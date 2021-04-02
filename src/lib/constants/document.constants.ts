import {DocStatus, DocumentId} from '@lib/models/document.model';

const DOCUMENT_NAMES = {
  ATTENDANCE: 'ATTENDANCE',
  CT1: 'CT 1',
  CT2: 'CT 2',
  ASSIGNMENT: 'ASSIGNMENT',
  END_SEM: 'END SEMESTER',
  GRADING_CRITERIA: 'GRADING CRITERIA',
  GRADES: 'GRADES',
};

export const MARK_DOCUMENTS: DocumentId[] = ['CT1', 'CT2', 'ASSIGNMENT', 'END_SEM'];

export const FACULTY_DOCUMENT_GROUPS = [{
  title: 'Attendance',
  actions: ['ATTENDANCE']
}, {
  title: 'Marklist',
  actions: ['CT1', 'CT2', 'ASSIGNMENT', 'END_SEM']
}, {
  title: 'Grading',
  actions: ['GRADES', 'GRADING_CRITERIA']
}
];

export const DOC_STATUS_CODES: Record<string, DocStatus> = {
  private: DocStatus.PRIVATE,
  submitted: DocStatus.SUBMITTED,
  public: DocStatus.PUBLIC,
  remarked: DocStatus.REMARKED,
};

export const DOC_STATUS_UI_NAMES: Record<number, string> = {
  [DocStatus.PRIVATE]: '-',
  [DocStatus.SUBMITTED]: 'submitted',
  [DocStatus.PUBLIC]: 'published',
  [DocStatus.REMARKED]: 'under review',
};

export default DOCUMENT_NAMES;
