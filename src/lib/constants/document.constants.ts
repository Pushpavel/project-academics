import {DocStatus} from '@lib/models/document.model';

const DOCUMENT_NAMES: Record<string, string> = {
  ATTENDANCE: 'ATTENDANCE',
  CT1: 'CT 1',
  CT2: 'CT 2',
  ASSIGNMENT: 'ASSIGNMENT',
  END_SEM: 'END SEMESTER',
  GRADING_CRITERIA: 'GRADING CRITERIA',
  GRADES: 'GRADES',
};

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

export const DOCUMENT_STATUS_NAMES: Record<number, string> = {
  [DocStatus.PRIVATE]: '-',
  [DocStatus.SUBMITTED]: 'submitted',
  [DocStatus.PUBLIC]: 'published',
  [DocStatus.REMARKED]: 'under review',
};

export default DOCUMENT_NAMES;
