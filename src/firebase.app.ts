import {environment} from './environments/environment';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import Auth = firebase.auth.Auth;
import Firestore = firebase.firestore.Firestore;
import Functions = firebase.functions.Functions;

// const app = firebase.initializeApp(environment.FIREBASE_CONFIG);

export const auth = null as unknown as Auth;//app.auth();
export const firestore = null as unknown as Firestore;//app.firestore();
export const cloudFunction = null as unknown as Functions; //app.functions('asia-south1');
//
// if (!environment.production) {
//   auth.useEmulator('http://localhost:9099');
//   firestore.useEmulator('localhost', 8080);
//   cloudFunction.useEmulator('localhost', 5001);
// }
