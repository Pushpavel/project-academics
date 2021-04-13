import firebase from 'firebase/app';
import 'firebase/auth';
import {environment} from './environment';

// see issue https://github.com/angular/angularfire/issues/2656
export const initialize = (config: any) => {
  firebase.initializeApp(config);

  if (!environment.production)
    firebase.auth().useEmulator('http://localhost:9099');

};
