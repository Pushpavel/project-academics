import {environment} from './environments/environment';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

const app = firebase.initializeApp(environment.FIREBASE_CONFIG);

export const auth = app.auth();
export const firestore = app.firestore();
// export const cloudFunction = app.functions('asia-south1');

if (!environment.production) {
  auth.useEmulator('http://localhost:9099');
  firestore.useEmulator('localhost', 8080);
}
