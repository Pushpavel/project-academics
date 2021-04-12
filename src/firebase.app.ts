import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import Auth = firebase.auth.Auth;
import Functions = firebase.functions.Functions;

export const auth = null as unknown as Auth;
export const cloudFunction = null as unknown as Functions;

