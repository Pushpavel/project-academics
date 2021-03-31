export interface AttendanceEntryRaw {
  rollNo: string,
  attended: number,
}

export interface AttendanceEntryUI extends AttendanceEntryRaw {
  name: string,
  percentage: string
}
