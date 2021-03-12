export interface AcademicUser {
  uid: string, // can be roll_no or email id depending on user
  displayName: string;
  email: string;
  role: 'faculty' | 'student' | 'hod' | 'exam-cell',
  isStudent?: boolean,
  isFaculty?: boolean,
  isExamCell?: boolean,
  isHod?: boolean
}
