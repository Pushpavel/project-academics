import {ColumnSetting} from '../../app/mdc-helper/mdc-table/mdc-table.component';
import {AttendanceEntryUI} from '@lib/models/attendance.model';
import {MarklistEntryUI} from '@lib/models/marklist.model';
import {GradingCriteriaEntry, GradeEntryUI} from '@lib/models/grading.model';
import DOCUMENT_NAMES from '@lib/constants/document.constants';

export const ATTENDANCE_COLUMN_SETTINGS: ColumnSetting<AttendanceEntryUI>[] = [
  {key: 'rollNo', label: 'Roll No'},
  {key: 'name', label: 'Name'},
  {key: 'attended', label: 'No of Classes Attended'},
  {key: 'percentage', label: 'Percentage'}
];

export const MARKLIST_COLUMN_SETTINGS: ColumnSetting<MarklistEntryUI>[] = [
  {key: 'name', label: 'Name'},
  {key: 'rollNo', label: 'Roll No'},
  {key: 'mark', label: 'Mark'},
];

export const GRADES_COLUMN_SETTINGS: ColumnSetting<GradeEntryUI>[] = [
  {key: 'rollNo', label: 'Roll No'},
  {key: 'name', label: 'Name'},
  {key: 'CT1', label: 'CT1'},
  {key: 'CT2', label: 'CT2'},
  {key: 'ASSIGNMENT', label: 'ASSIGNMENT'},
  {key: 'END_SEM', label: 'END SEMESTER'},
  {key: 'total', label: 'TOTAL'},
  {key: 'grade', label: 'GRADE'},
];

export const GRADING_CRITERIA_COLUMN_SETTINGS: ColumnSetting<GradingCriteriaEntry>[] = [
  {key: 'grade', label: 'Grade'},
  {key: 'minMark', label: 'Minimum Mark'},
  {key: 'maxMark', label: 'Maximum Mark'},
];

export const DOCUMENT_COLUMN_SETTINGS: Record<keyof typeof DOCUMENT_NAMES, ColumnSetting[]> = {
  CT1: MARKLIST_COLUMN_SETTINGS,
  CT2: MARKLIST_COLUMN_SETTINGS,
  ASSIGNMENT: MARKLIST_COLUMN_SETTINGS,
  END_SEM: MARKLIST_COLUMN_SETTINGS,
  GRADES: GRADES_COLUMN_SETTINGS,
  ATTENDANCE: ATTENDANCE_COLUMN_SETTINGS,
  GRADING_CRITERIA: GRADING_CRITERIA_COLUMN_SETTINGS,
};
