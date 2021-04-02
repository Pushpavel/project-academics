import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, from, Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { AcademicUser } from '@lib/models/user.model';
import { authState } from 'rxfire/auth';
import { auth, firestore } from '../firebase.app';
// todo: Remove as valueChanges | This was kept for understanding purpose
import { doc as valueChanges } from 'rxfire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

/*
* service is Behavioral Subject, has {user} observable, which can be used to observe authentication events
*/

export class UserService extends BehaviorSubject<AcademicUser | null> implements OnDestroy {


  constructor() {
    super(null)
    this.listenAuthState()
  }

  private authStateListener?: any

  get user() {
    return this.asObservable()
  }

  private authClaims(u: firebase.User) {
    return from(u.getIdTokenResult()).pipe(map(r => r.claims.role))
  }

  private roleBools(role: 'faculty' | 'student' | 'hod' | 'exam_cell'){
    return {
      isExamCell: role === 'exam_cell',
      isFaculty: role === 'faculty',
      isHod: role === 'hod',
      isStudent: role === 'student',
    }
  }

  //TODO : check whether is it nessary to fetch firestore object of authenticated user
  private listenAuthState() {
    this.authStateListener = authState(auth).pipe(switchMap((u) => {
      const authClaimsObs = this.authClaims(u)
      return u ? combineLatest([of(u), valueChanges(firestore.doc(`accounts/${u.uid}`)), authClaimsObs]) : of(null)
    })).pipe(map((c) => {
      const safe = (data: any) => {
        return data ? data : {}
      }
      return c ? {
        displayName: c[0].displayName,
        email: c[0].email,
        uid: c[0].uid,
        role: c[2],
        ...this.roleBools(c[2]),
        ...safe(c[1].data())
      } as AcademicUser : null
    })).subscribe((u) => {
      this.next(u)
    });
  }

  // ! Auth Utils //

  /**
   * Gives boolean, whether user is opted for password or passwordless
   * if user is not passwordless, then he might set password for his account, on previous authentication
   * @param email 
   */
  async isPasswordLess(email: string) {
    let methods = await auth.fetchSignInMethodsForEmail(email)
    if (methods.indexOf(firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD) !== -1) {
      return true
    } else {
      return false
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
      return auth.signInWithEmailLink(email as string, url);
    }
    return null
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
    }
    try {
      await auth.sendSignInLinkToEmail(
        email,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', email);
      return true
    } catch (err) {
      return false
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
      return auth.currentUser.updatePassword(password)
    }

    return null
  }


  /**
   * Sign Out User :D
   * @returns promise
   */
  signOut() {
    return auth.signOut()
  }



  ngOnDestroy() {
    if (this.authStateListener) {
      console.log("user service  Unsubscribed");
      this.authStateListener.unsubscribe()
    }
  }
}
