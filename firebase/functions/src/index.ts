import * as functions from 'firebase-functions';
import { ImportUsersData } from './models';
import * as admin from 'firebase-admin';
import { publishDocuments as PD } from './publishDocuments';
import { createGrade as CG } from './createGrade';

const app = admin.initializeApp();

export const publishDocuments = PD(app.firestore())
export const createGrade = CG(app.firestore())

export const importUsers = functions.region('asia-south1').https.onCall(async (data: ImportUsersData, context) => {
  // TODO: Check administrative privileges
  // TODO: Verify Claims
  // TODO: Check duplicate entries
  if (data.users.length > 1000) return { error: 'MAX_USERS_PER_IMPORT_LIMIT_EXCEEDED' };
  const claims = data.claims.reduce((obj, claim) => {
    obj[claim] = true;
    return obj;
  }, {} as any);
  data.users.forEach(user => user.customClaims = claims);
  console.log(`Importing ${data.users.length} Users Account Data 🚀`);
  const response = await app.auth().importUsers(data.users);
  console.log(`Importing ${data.users.length} User Accounts Completed 🔥`, 'Response :', response);
  const accountsRef = app.firestore().collection('accounts');
  const batches = [app.firestore().batch()];

  if (data.users.length > 500)
    batches.push(app.firestore().batch());

  data.users.forEach((user, index) => {
    if (response.errors.some(err => err.index == index)) return; // return if user not created successfully
    batches[index >= 500 ? 1 : 0].set(accountsRef.doc(user.uid), {
      name: user.displayName,
      email: user.email
    });
  });
  console.log('Committing Users To Firestore 🚀');
  await Promise.all(batches.map(batch => batch.commit()
    .then(_ => console.log(`Committed Users To Firestore 🔥`))
    .catch(error => console.log(`Failed to Commit Users To Firestore 🙁`, 'Reason :', error.toString()))
  ));
  console.log('Committing Users Completed 🤚🏻');
  return response;
});
