import * as admin from 'firebase-admin';
import {TEST_COURSE} from './defaults';

const firestore = admin.firestore();

export async function createSemester(semId: string = TEST_COURSE.sem) {
  await firestore.doc(`semesters/${semId}`).set({version: 1});
  return semId;
}
