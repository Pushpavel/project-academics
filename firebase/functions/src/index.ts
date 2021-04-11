import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {_importUsers} from './importUsers';
import {_submitDocument} from './submitDocument';

const func = functions.region('asia-south1').https.onCall;

export const app = admin.initializeApp();

export const importUsers = func(_importUsers);

export const submitDocument = func(_submitDocument);


