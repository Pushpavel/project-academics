import firebase from 'firebase/app';
import DocumentData = firebase.firestore.DocumentData;
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

function defaultToFirestore(modelObject: any): DocumentData {
  return modelObject;
}

function defaultFromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot): any {
  return snapshot.data();
}

interface Converter<T extends DocumentData> {
  toFirestore?: FirestoreDataConverter<T>['toFirestore'],
  fromFirestore?: FirestoreDataConverter<T>['fromFirestore']
}

export function converter<T extends DocumentData>(converters: Converter<T>): FirestoreDataConverter<T> {
  return {
    toFirestore: converters.toFirestore ?? defaultToFirestore,
    fromFirestore: converters.fromFirestore ?? defaultFromFirestore,
  };
}
