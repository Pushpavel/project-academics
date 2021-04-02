import {ColumnSetting} from '../../app/mdc-helper/mdc-table/mdc-table.component';
import {AttendanceEntryUI} from '@lib/models/attendance.model';
import {MarklistEntryUI} from '@lib/models/marklist.model';
import {GradingCriteriaEntryUI, GradeEntryUI} from '@lib/models/grading.model';
import {DOCUMENT_NAMES} from '@lib/constants/document.constants';

type Settings<T> = (editable?: boolean) => ColumnSetting<T>[]

const ATTENDANCE_COLUMN_SETTINGS: Settings<AttendanceEntryUI> = (editable) => [
  {key: 'rollNo', label: 'Roll No'},
  {key: 'name', label: 'Name'},
  {key: 'attended', label: 'No of Classes Attended', editable, numeric: true},
  {key: 'percentage', label: 'Percentage', numeric: true}
];

const MARKLIST_COLUMN_SETTINGS: Settings<MarklistEntryUI> = (editable) => [
  {key: 'name', label: 'Name'},
  {key: 'rollNo', label: 'Roll No'},
  {key: 'mark', label: 'Mark', editable, numeric: true},
];

const GRADES_COLUMN_SETTINGS: Settings<GradeEntryUI> = () => [
  {key: 'rollNo', label: 'Roll No'},
  {key: 'name', label: 'Name'},
  {key: 'CT1', label: 'CT1', numeric: true},
  {key: 'CT2', label: 'CT2', numeric: true},
  {key: 'ASSIGNMENT', label: 'ASSIGNMENT', numeric: true},
  {key: 'END_SEM', label: 'END SEMESTER', numeric: true},
  {key: 'total', label: 'TOTAL', numeric: true},
  {key: 'grade', label: 'GRADE'},
];

const GRADING_CRITERIA_COLUMN_SETTINGS: Settings<GradingCriteriaEntryUI> = (editable) => [
  {key: 'grade', label: 'Grade'},
  {key: 'minMark', label: 'Minimum Mark', editable, numeric: true},
  {key: 'maxMark', label: 'Maximum Mark', numeric: true},
];

export const DOCUMENT_COLUMN_SETTINGS: Record<keyof typeof DOCUMENT_NAMES, Settings<any>> = {
  CT1: MARKLIST_COLUMN_SETTINGS,
  CT2: MARKLIST_COLUMN_SETTINGS,
  ASSIGNMENT: MARKLIST_COLUMN_SETTINGS,
  END_SEM: MARKLIST_COLUMN_SETTINGS,
  GRADES: GRADES_COLUMN_SETTINGS,
  ATTENDANCE: ATTENDANCE_COLUMN_SETTINGS,
  GRADING_CRITERIA: GRADING_CRITERIA_COLUMN_SETTINGS,
};
