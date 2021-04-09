import {Injectable, OnDestroy} from '@angular/core';
import {combineLatest, from, Observable, of, ReplaySubject} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {AcademicUser} from '@lib/models/user.model';
import {authState} from 'rxfire/auth';
import {auth, firestore} from '../firebase.app';
import {fromDocRef} from 'rxfire/firestore';
import firebase from 'firebase/app';
import {environment} from '../environments/environment';

/**
 * Manages User Authentication and State
 *
 * This Observable behaves similar to FirebaseUser.getCurrentUser()
 * @type {AcademicUser} - user is authenticated
 * @type {null} - user is not authenticated
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends Observable<AcademicUser | null> implements OnDestroy {

  /**
   * data of the logged in user 
   * @private
   */
  private userData = new ReplaySubject<AcademicUser | null>(1);


  constructor() {
    super(subscriber => this.userData.subscribe(subscriber));
    if (environment.localUser)
      setTimeout(() => this.userData.next(environment.localUser), 800);
    else
      this.listenAuthState();
  }

  /**
   * observable that emits only if there is a logged in user
   */
  get loggedInUser() {
    return this.userData.pipe(
      filter(user => !!user)
    );
  }

  /**
   * @deprecated instead use UserService instance directly
   */
  get user() {
    return this;
  }

  private authStateListener?: any;

  private authClaims(u: firebase.User) {
    return u ? from(u.getIdTokenResult()).pipe(map(r => r.claims)) : of(null);
  }

  // TODO : (can be removed) check whether is it necessary to fetch firestore object of authenticated user
  // TODO : move map in outer pipe inside switchMap to avoid passing FirebaseUser instance
  private listenAuthState() {
    this.authStateListener = authState(auth).pipe(switchMap((u) => {
      const authClaimsObs = this.authClaims(u);
      return u ? combineLatest([of(u), fromDocRef(firestore.doc(`accounts/${u.uid}`)), authClaimsObs]) : of(null);
    })).pipe(map((c) => {
      const safe = (data: any) => {
        return data ? data : {};
      };
      return c ? {
        displayName: c[0].displayName,
        email: c[0].email,
        uid: c[0].uid,
        ...c[2],
        ...c[1].data() ?? {}
      } as AcademicUser : null;
      // TODO: .subscribe(this.userData); is better as it will subscribe to error and complete callbacks as well
    })).subscribe((u) => {
      this.userData.next(u);
    });
  }

  // ! Auth Utils //

  /**
   * Gives boolean, whether user is opted for password or passwordless
   * if user is not passwordless, then he might set password for his account, on previous authentication
   * @param email
   */
  async isPasswordLess(email: string) {
    let methods = await auth.fetchSignInMethodsForEmail(email);
    if (methods.indexOf(firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Call this initalially, for redirection from passwordless signin
   * @param url
   * @returns Promise
   */
  SignInWithLink(url: string) {
    if (auth.isSignInWithEmailLink(url)) {
      let email = window.localStorage.getItem('emailForSignIn');

      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      //hope user state observer takes care
      window.localStorage.removeItem('emailForSignIn');
      if (auth.currentUser) {
        return null;
      }
      return auth.signInWithEmailLink(email as string, url);
    }
    return null;
  }

  /**
   * Sends the auth link incase the user prefers passwordless
   * @param email
   * @returns Promise
   */
  async sendSignInLink(email: string) {
    const actionCodeSettings = {
      url: 'https://localhost:4200/login',
      handleCodeInApp: true,
    };
    try {
      await auth.sendSignInLinkToEmail(
        email,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', email);
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * set password for the user, incase he prefers email/password authentication method
   * returns null if user is not signed in
   * @param password
   * @returns Promise
   */
  setpassword(password: string) {
    if (auth.currentUser) {
      return auth.currentUser.updatePassword(password);
    }

    return null;
  }


  /**
   * Sign Out User :D
   * @returns promise
   */
  signOut() {
    return auth.signOut();
  }

  /**
   * TODO: Unsubscribing authStateListener is unnecessary as we need to be listening throughout the lifecycle of the app
   */
  ngOnDestroy() {
    if (this.authStateListener) {
      console.log('user service  Unsubscribed');
      this.authStateListener.unsubscribe();
    }
  }
}
