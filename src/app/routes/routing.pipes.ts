import {of, ObservableInput} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AuthPipe} from './auth-pipe.guard';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import FieldPath = firebase.firestore.FieldPath;


export const loggedIn: AuthPipe = map(user => !!user);

export const thenRedirectToHome = (afs: AngularFirestore) => switchMap((can: any) => {
    if (can == true)
      return of('sem/2020_2/home');
    // return afs.collection('semesters', q => q.orderBy(FieldPath.documentId()).limitToLast(1)).get().pipe(
    //   map(snaps => {
    //     console.log(snaps.docs[0].id);
    //     return `sem/${snaps.docs[0].id}/home`;
    //   })
    // );

    return of(can);
  }
);

export const elseStay = map((can: any) => can == false || can);

export const elseRedirectTo = <I, O>(redirect: string | any[]) =>
  map<I, O>((can: any) => (can == false) && redirect || can);

export const thenMap = <T extends any, R>(project: (val: T) => R) => {
  return map<T, R | T>(can => {
    if (can == true)
      return project(can);
    return can;
  });
};

export const elseSwitchMap = <T, O extends ObservableInput<any>>(project: (value: T, index: number) => O) => {
  return switchMap<T, O | ObservableInput<T>>((can, index) => {
    if (can as any == false)
      return project(can, index);
    return of(can);
  });
};
