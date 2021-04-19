import * as admin from 'firebase-admin';

const firestore = admin.firestore();

export async function createSemester(semId: string) {
  await firestore.doc(`semesters/${semId}`).set({version: 1});
  return semId;
}
