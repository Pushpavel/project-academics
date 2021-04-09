import * as admin from 'firebase-admin';

export type UserRecord = admin.auth.UserImportRecord

export interface ImportUsersData {
  claims: string[],
  users: UserRecord[]
}

export interface DocumentPublishType {
  sem_id : string,
  document : string,
  course_id : string
}