export interface StudentMarkEntry {
  documentId: string,
  documentName: string,
  mark: number,
  totalMark: number,
  timestamp: number
}

export interface StudentAttendanceEntry {
  percentage: number,
  attendedClasses: number,
  totalClasses: number,
  timestamp: number
}

export interface StudentSemResult {
  credits: number,
  gpa: number
}


export interface StudentCourseResult {
  courseName: string,
  code: string,
  grade: string,
  credits: number,
}

export interface StudentsDocumentRaw {
  entries: Record<string, string>
}
