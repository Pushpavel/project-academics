// this import is needed for typescript path mapping to work
import 'module-alias/register';

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import {error} from './error.utils';
import {INTERNAL_ERROR} from './error';

admin.initializeApp();

import {_importUsers} from './importUsers';
import {_submitDocument} from './submitDocument';
import {_submitGrades} from './submitGrades';

// uncomment to use for generating fake data
import {_generateScenario} from '../scenarios/1.private-course';

export const importUsers = callable(_importUsers);
export const submitDocument = callable(_submitDocument);
export const submitGrades = callable(_submitGrades);

// uncomment to use for generating fake data
export const generateScenario = callable(_generateScenario);


export function callable(func: Parameters<typeof functions.https.onCall>[0]) {
  return functions.region('asia-south1').https.onCall((data, context) => {
    try {
      return func(data, context);
    } catch (e) {
      return error(INTERNAL_ERROR, e);
    }
  });
}
