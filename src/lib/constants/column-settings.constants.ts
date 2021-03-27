import {ColumnSetting} from '../../app/mdc-helper/mdc-table/mdc-table.component';
import {AttendanceEntry} from '@lib/models/attendance.model';
import {MarklistEntry} from '@lib/models/marklist.model';
import {GradeEntry} from '@lib/models/grading.model';

export const ATTENDANCE_COLUMN_SETTINGS: ColumnSetting<AttendanceEntry>[] = [
  {key: 'rollNo', label: 'Roll No'},
  {key: 'name', label: 'Name'},
  {key: 'noOfAttendedClasses', label: 'No of Classes Attended'},
  {key: 'percentage', label: 'Percentage'}
];

export const MARKLIST_COLUMN_SETTINGS: ColumnSetting<MarklistEntry>[] = [
  {key: 'name', label: 'Name'},
  {key: 'rollNo', label: 'Roll No'},
  {key: 'mark', label: 'Mark'},
];

export const GRADES_COLUMN_SETTINGS: ColumnSetting<GradeEntry>[] = [
  {key: 'rollNo', label: 'Roll No'},
  {key: 'name', label: 'Name'},
  {key: 'CT1', label: 'CT1'},
  {key: 'CT2', label: 'CT2'},
  {key: 'ASSIGNMENT', label: 'ASSIGNMENT'},
  {key: 'END_SEM', label: 'END SEMESTER'},
  {key: 'TOTAL', label: 'TOTAL'},
  {key: 'GRADE', label: 'GRADE'},
];
