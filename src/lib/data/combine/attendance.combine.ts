import {
  AttendanceEntryRaw,
  AttendanceEntryUI, AttendanceMetaRaw,
  ProtectedAttendanceMetaRaw
} from '@models/document/attendance.model';
import {mapObjectEntries} from '../../utils/native/map.utils';

export function attendanceEntriesUIModel(
  [entries, studentNames, meta]: [AttendanceEntryRaw[], Map<string, string>, AttendanceMetaRaw]
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

export function attendanceEntriesFromProtectedMeta(meta: ProtectedAttendanceMetaRaw) {
  return mapObjectEntries(meta.entries,
    (rollNo, attended) => ({rollNo, attended})
  );
}
