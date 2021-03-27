const DOCUMENT_NAMES: Record<string, string> = {
  ATTENDANCE: 'ATTENDANCE',
  CT1: 'CT 1',
  CT2: 'CT 2',
  ASSIGNMENT: 'ASSIGNMENT',
  END_SEM: 'END SEMESTER',
  GRADES: 'GRADES',
  GRADING_CRITERIA: 'GRADING CRITERIA',
};

export const DOCUMENT_GROUPS = [{
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

export default DOCUMENT_NAMES;
