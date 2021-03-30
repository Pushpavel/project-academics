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
  grade: string,
  credits: number,
  gpa: number
}


export interface StudentCourseResult {
  courseName: string,
  courseCode: string,
  grade: string,
  credits: number,
}

export interface StudentsDocumentRaw {
  entries: Record<string, string>
}
