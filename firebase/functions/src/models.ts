import * as admin from 'firebase-admin';

export type UserRecord = admin.auth.UserImportRecord

export interface ImportUsersData {
  claims: string[],
  dept?: string,
  users: UserRecord[]
}
