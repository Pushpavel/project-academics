import {BasePrivateMetaRaw, BaseProtectedMetaRaw} from './document-base.model';

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


export type AttendanceEntryZZZ = Omit<EntryRaw, 'rollNo'>
export type AttendanceEntryRaw = EntryRaw
export type AttendanceEntryUI = EntryUI

export type BaseAttendanceMetaZZZ = MetaRaw;
export type ProtectedAttendanceMetaRaw = MetaRaw & { entries: Record<string, number> } & BaseProtectedMetaRaw
export type PrivateAttendanceMetaRaw = MetaRaw & BasePrivateMetaRaw

export type AttendanceMetaRaw = ProtectedAttendanceMetaRaw | PrivateAttendanceMetaRaw
