import {ColumnSetting} from '../../app/mdc-helper/mdc-table/mdc-table.component';
import {AttendanceEntry} from '@lib/models/attendance.model';

export const ATTENDANCE_COLUMN_SETTINGS: ColumnSetting<AttendanceEntry>[] = [
  {key: 'rollNo', label: 'Roll No'},
  {key: 'name', label: 'Name'},
  {key: 'noOfAttendedClasses', label: 'No of Classes Attended'},
  {key: 'percentage', label: 'Percentage'}
];
