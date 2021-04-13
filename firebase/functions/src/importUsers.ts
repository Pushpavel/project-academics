import * as admin from 'firebase-admin';
import {ImportUsersData} from './models';

const auth = admin.auth();
const firestore = admin.firestore();

export async function _importUsers(data: ImportUsersData) {

  try {

    // TODO: Check administrative privileges
    // TODO: Verify Claims
    // TODO: Check duplicate entries
    if (data.users.length > 1000) return {error: 'MAX_USERS_PER_IMPORT_LIMIT_EXCEEDED'};

    if (data.claims.find(claim => claim == 'isHod') && !data.dept)
      return {error: `'isHod' CLAIM REQUESTED WITHOUT 'dept' field`};

    const claims = data.claims.reduce((obj, claim) => {
      obj[claim] = claim == 'isHod' ? data.dept : true;
      return obj;
    }, {} as any);

    data.users.forEach(user => user.customClaims = claims);

    console.log(`Importing ${data.users.length} Users Account Data 🚀`);
    const response = await auth.importUsers(data.users);
    console.log(`Importing ${data.users.length} User Accounts Completed 🔥`, 'Response :', response);

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

    console.log('Committing Users To Firestore 🚀');

    await Promise.all(batches.map(batch => batch.commit()
      .then(_ => console.log(`Committed Users To Firestore 🔥`))
      .catch(error => console.log(`Failed to Commit Users To Firestore 🙁`, 'Reason :', error))
    ));
    console.log('Committing Users Completed 🤚🏻');

    return response;

  } catch (e) {
    console.error(e);
    return {error: 'internal error'};
  }
}

