import {converter} from '@lib/data-adapters/base/convert.default';
import {AttendanceEntryRaw, AttendanceEntryUI} from '@lib/models/attendance.model';
import {PrivateDocumentMetaRaw} from '@lib/models/document.model';

export const privateAttendanceEntryConvert = (studentNames: Map<string, string>, meta: PrivateDocumentMetaRaw) =>
  converter<AttendanceEntryUI>({
    fromFirestore(snap) {
      const data = snap.data() as AttendanceEntryRaw;
      return {
        ...data,
        percentage: (100 * data.attended / (meta.total ?? -1)).toString() + '%',// TODO: Handle These
        name: studentNames.get(data.rollNo) ?? 'Error'
      };
    }
  });
