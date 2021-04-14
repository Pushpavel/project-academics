import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import {error} from './error.utils';
import {INTERNAL_ERROR} from './error';

admin.initializeApp();

import {_importUsers} from './importUsers';
import {_submitDocument} from './submitDocument';
import {_submitGrades} from './submitGrades';


export const importUsers = callable(_importUsers);
export const submitDocument = callable(_submitDocument);
export const submitGrades = callable(_submitGrades);


function callable(func: Parameters<typeof functions.https.onCall>[0]) {
  return functions.region('asia-south1').https.onCall((data, context) => {
    try {
      return func(data, context);
    } catch (e) {
      return error(INTERNAL_ERROR, e);
    }
  });
}
