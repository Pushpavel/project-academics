import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

import { _importUsers } from './importUsers';
import { _submitDocument } from './submitDocument';
import { _createGrade } from './createGrade'



export const importUsers = functions.region('asia-south1').https.onCall(_importUsers);

export const submitDocument = functions.region('asia-south1').https.onCall(_submitDocument);

export const createGrade = functions.region('asia-south1').https.onCall(_createGrade);


