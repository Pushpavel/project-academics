import * as admin from 'firebase-admin';
import {logger} from 'firebase-functions';
import {INVALID_DATA_ERROR} from './error';
import {error} from './error.utils';
import {ImportUsersData} from './models';

const auth = admin.auth();
const firestore = admin.firestore();

export async function _importUsers(data: ImportUsersData) {
  // TODO: Check administrative privileges
  // TODO: Verify Claims
  // TODO: Check duplicate entries

  if (data.users.length > 1000) return error(INVALID_DATA_ERROR, 'cannot import more than 1000 users at a time', data.users.length);

  if (data.claims.find(claim => claim == 'isHod') && !data.dept)
    return error(INVALID_DATA_ERROR, `'isHod' claim requested without 'dept' field`);

  const claims = data.claims.reduce((obj, claim) => {
    obj[claim] = claim == 'isHod' ? data.dept : true;
    return obj;
  }, {} as any);

  data.users.forEach(user => user.customClaims = claims);

  console.log(`Importing ${data.users.length} Users Account Data 🚀`);

  // creating user accounts
  const response = await auth.importUsers(data.users);

  logger.log(`Importing ${data.users.length} Users Accounts Response `,
    'Success:', response.successCount,
    'Failed:', response.failureCount
  );

  if (response.failureCount)
    logger.error(response.errors[0].error);

  // uploading to firestore
  const accountsRef = firestore.collection('accounts');
  const batches = [firestore.batch()];

  if (data.users.length > 500)
    batches.push(firestore.batch());

  data.users.forEach((user, index) => {
    if (response.errors.some(err => err.index == index)) return; // return if user not created successfully
    batches[index >= 500 ? 1 : 0].set(accountsRef.doc(user.uid), {
      name: user.displayName,
      email: user.email
    });
  });


  await Promise.all(batches.map(batch => {
      return batch.commit().catch(error => console.log(`Failed to Commit Users To Firestore 🙁`, 'Reason :', error));
    }
  ));

  return response;
}

