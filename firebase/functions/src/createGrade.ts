

import * as functions from 'firebase-functions';
import { DocumentPublishType } from './models';


export const createGrade = (firestore: FirebaseFirestore.Firestore) => functions.region('asia-south1').https.onCall(async (data: DocumentPublishType, context) => {

    return {}
})