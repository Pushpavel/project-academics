import {DocMeta} from '@lib/models/document.model';

export interface AttendanceEntry {
  rollNo: string,
  name: string,
  noOfAttendedClasses: number,
  percentage: number,
}

export interface AttendanceEntryRaw {
  roll_no: string,
  attendance: number,
}

export interface AttendanceDocMeta extends DocMeta {
  totalClasses: number,
}
