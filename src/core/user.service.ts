import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {delay, switchMap} from 'rxjs/operators';
import {AcademicUser} from '@lib/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BehaviorSubject<AcademicUser | null> {

  user: Observable<any> | undefined;
  actionCodeSettings: any = {};

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    super(null);

    const dummyAcademicUser: AcademicUser = {
      uid: 'mbalaMoses1978482@nitpy.ac.in',
      email: 'mbalaMoses1978482@nitpy.ac.in',
      isFaculty: true,
      displayName: 'Bala Moses',
      role: 'faculty'
    };

    // Simulating login api call
    of(dummyAcademicUser).pipe(delay(1500)).subscribe(this);

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc(`accounts/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  signInWithPassword(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signInWithLink(email: string): Promise<any> {
    return this.afAuth.sendSignInLinkToEmail(email, this.actionCodeSettings);
  }

  signOut(): Promise<any> {
    return this.afAuth.signOut();
  }



  // userId: any = JSON.parse(localStorage.getItem('user') || '{}');
  // return this.userId !== null && this.userId.emailVerified;

  // getUserDetails(): Observable<any> {
  //   return this.afAuth.authState.pipe(
  //     switchMap(user => {
  //       if (user && user.uid) {
  //         const idTokenResult = user.uid.getIdTokenResult();
  //         const accountRef = this.afs
  //           .collection('accounts', ref => ref.where('email', '==', user.uid));
  //
  //         const userDetails: User = {
  //           name: accountRef.doc['name'],
  //           rollNumber: idTokenResult.claims.student ? accountRef.id : undefined,
  //           email: accountRef.doc['email'],
  //           roles: {
  //             faculty: !!idTokenResult.claims.faculty,
  //             hod: !!idTokenResult.claims.hod,
  //             examCell: !!idTokenResult.claims.examcell,
  //             student: !!idTokenResult.claims.student,
  //           } as Roles,
  //         } as User;
  //
  //         return of(userDetails);
  //       }
  //     })
  //   );
  // };

  // isLoggedIn(): Observable<User> {
  //   return this.afAuth.authState.switchMap(user => {
  //     if (user && user.uid) {
  //       return this.afs.doc<User>(`accounts/${user.uid}`).valueChanges();
  //     } else {
  //       return Observable.of(null);
  //     }
  //   })
  // }
  //
  // async getDetails(): Promise<User> {
  //   try {
  //     let isLoggedIn = this.isLoggedIn();
  //
  //     if (isLoggedIn) {
  //       const accountRef = await this.afs
  //         .collection("accounts", ref => ref.where("email", "==", this.userId))
  //       const idTokenResult = await this.userId.getIdTokenResult();
  //
  //       return {
  //         name: accountRef.doc['name'],
  //         rollNumber: idTokenResult.claims.student ? accountRef.id : undefined,
  //         email: accountRef.doc['email'],
  //         roles: {
  //           faculty: !!idTokenResult.claims.faculty,
  //           hod: !!idTokenResult.claims.hod,
  //           examCell: !!idTokenResult.claims.examcell,
  //           student: !!idTokenResult.claims.student,
  //         } as Roles,
  //       } as User;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}
