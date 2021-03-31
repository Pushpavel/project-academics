import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, from, Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { AcademicUser } from '@lib/models/user.model';
import { authState } from 'rxfire/auth';
import { auth, firestore } from '../firebase.app';
// todo: Remove as valueChanges | This was kept for understanding purpose
import { doc as valueChanges } from 'rxfire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BehaviorSubject<AcademicUser | null> implements OnDestroy {


  constructor() {
    super(null)
    this.listenAuthState()
  }

  private authStateListener?: any

  get user() {
    return this.asObservable()
  }

  authClaims(u : firebase.default.User){
    return from(u.getIdTokenResult()).pipe(map(r => r.claims.role))
  }

  listenAuthState() {
    this.authStateListener = authState(auth).pipe(switchMap((u) => {
      const authClaimsObs = this.authClaims(u)
      return u ? combineLatest([ of(u), valueChanges(firestore.doc(`accounts/${u.uid}`)), authClaimsObs ]) : of(null)
    })).pipe(map((c) => {

      const safe = (data: any) => {
        return data ? data : {}
      }

      const roleBools = (role : 'faculty' | 'student' | 'hod' | 'exam_cell') => {
       return {
        isExamCell : role === 'exam_cell',
        isFaculty : role === 'faculty',
        isHod : role === 'hod',
        isStudent : role === 'student' ,
        }
      }
      return c ? {
        displayName: c[0].displayName,
        email: c[0].email,
        uid: c[0].uid,
        role : c[2],  
        ...roleBools(c[2]),
        ...safe(c[1].data())
      } as AcademicUser : null
    })).subscribe((u) => {
      console.log(u);
      this.next(u)
    });
}

  SignIn(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password)
  }

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
