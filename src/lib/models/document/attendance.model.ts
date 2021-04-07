import {BasePrivateMetaRaw} from '@lib/models/document/document-base.model';

interface EntryRaw {
  rollNo: string,
  attended: number,
}

interface EntryUI extends AttendanceEntryRaw {
  name: string,
  percentage: string
}

interface PublicMetaRaw {
  total: number
}


export type AttendanceEntryRaw = EntryRaw
export type AttendanceEntryUI = EntryUI
export type PublicAttendanceMetaRaw = PublicMetaRaw
export type PrivateAttendanceMetaRaw = PublicAttendanceMetaRaw & BasePrivateMetaRaw
