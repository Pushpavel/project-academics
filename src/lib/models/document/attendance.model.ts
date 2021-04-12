import {BasePrivateMetaRaw} from '@lib/models/document/document-base.model';

interface EntryRaw {
  rollNo: string,
  attended: number,
}

interface EntryUI extends AttendanceEntryRaw {
  name: string,
  percentage: string
}

interface MetaRaw {
  total: number
}


export type AttendanceEntryRaw = EntryRaw
export type AttendanceEntryUI = EntryUI
export type ProtectedAttendanceMetaRaw = MetaRaw & { entries: Record<string, string> }
export type PrivateAttendanceMetaRaw = MetaRaw & BasePrivateMetaRaw
