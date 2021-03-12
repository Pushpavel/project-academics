import {Injectable} from '@angular/core';
import {User, Roles} from '@lib/models/user.model';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable, of} from "rxjs";
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // userId: any = JSON.parse(localStorage.getItem('user') || '{}');
  // return this.userId !== null && this.userId.emailVerified;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
  }

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
