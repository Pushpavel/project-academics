import firebase from 'firebase/app';
import DocumentData = firebase.firestore.DocumentData;
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;
import QuerySnapshot = firebase.firestore.QueryDocumentSnapshot;


/**
 * Utility Function to define a FirestoreDataConverter Object with defaults,
 * This makes it convenient to only override either toFirestore or fromFirestore
 *
 * @param converters Converter Object (see below)
 */
export function converter<T extends DocumentData>(converters: Converter<T>): FirestoreDataConverter<T> {
  return {
    toFirestore: converters.toFirestore ?? defaultToFirestore,
    fromFirestore: converters.fromFirestore ?? defaultFromFirestore,
  };
}




/**
 * Object containing the overridden implementation of FirestoreDataConverter
 */
interface Converter<T extends DocumentData> {
  toFirestore?: FirestoreDataConverter<T>['toFirestore'],
  fromFirestore?: FirestoreDataConverter<T>['fromFirestore']
}





/*  DEFAULT IMPLEMENTATIONS */
function defaultToFirestore(modelObject: any): DocumentData {
  return modelObject;
}

function defaultFromFirestore(snapshot: QuerySnapshot): any {
  return snapshot.data();
}



