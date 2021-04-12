import firebase from 'firebase/app';
import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QueryDocumentSnapshot;
import {SinkUpdate} from '@lib/data/base/sink.interfaces';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export type fromFirestore<T> = (snap: DocumentSnapshot) => T
export type toFirestore<T, K extends keyof T | never = never> = (update: SinkUpdate<T, K>) => DocumentData

/*  DEFAULT IMPLEMENTATIONS */
export function defaultToFirestore(modelObject: any): DocumentData {
  return modelObject;
}

export function defaultFromFirestore(snapshot: QuerySnapshot): any {
  return snapshot.data();
}



