import {AttendanceEntryRaw, AttendanceEntryUI, PrivateAttendanceMetaRaw} from '@models/document/attendance.model';

export function attendanceEntriesUIModel(
  [entries, studentNames, meta]: [AttendanceEntryRaw[], Map<string, string>, PrivateAttendanceMetaRaw]
): AttendanceEntryUI[] {
  return entries.map(entry => {
    const percentage = meta.total ? 100 * entry.attended / meta.total : 100;
    return {
      ...entry,
      percentage: (Math.round(percentage * 100) / 100).toString() + '%', // TODO: Implement correct rounding of percentage
      name: studentNames.get(entry.rollNo) ?? 'Error' // TODO: Handle this
    };
  });
}
