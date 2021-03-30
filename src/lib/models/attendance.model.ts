export interface AttendanceEntry {
  rollNo: string,
  attended: number,
}

export interface AttendanceEntryUI extends AttendanceEntry {
  name: string,
  percentage: string
}
