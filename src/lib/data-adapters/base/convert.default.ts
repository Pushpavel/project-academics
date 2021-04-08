import firebase from 'firebase/app';
import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QueryDocumentSnapshot;
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import {SinkUpdate} from '@lib/data-adapters/base/sink.interfaces';

export type fromFirestore<T> = (snap: QueryDocumentSnapshot) => T
export type toFirestore<T, K extends keyof T | never = never> = (update: SinkUpdate<T, K>) => DocumentData

/*  DEFAULT IMPLEMENTATIONS */
export function defaultToFirestore(modelObject: any): DocumentData {
  return modelObject;
}

export function defaultFromFirestore(snapshot: QuerySnapshot): any {
  return snapshot.data();
}



