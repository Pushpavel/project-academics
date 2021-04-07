import {fromPromise} from 'rxjs/internal-compatibility';
import {firestore} from '../../../firebase.app';
import firebase from 'firebase/app';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;
import DocumentData = firebase.firestore.DocumentData;
import {collectionData, docData, snapToData} from 'rxfire/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import CollectionReference = firebase.firestore.CollectionReference;
import Query = firebase.firestore.Query;


/**
 * Fetches or observes a single Document from Firestore
 * @param p config for the query
 */
export function fetchObj<T extends DocumentData>(p: SourceDef<T>) {
  let ref = firestore.doc(p.path);
  if (p.convert) ref = ref.withConverter(p.convert);

  if (!p.once)
    return docData(ref, p.idField as string) as Observable<T>;

  return fromPromise(ref.get()).pipe(map(snap => snapToData(snap, p.idField as string) as T));
}

/**
 * Fetches or observes documents from a collection from Firestore or using a collectionQuery query
 * @param p config for query
 */
export function fetchList<T extends DocumentData, C extends CollectionReference | Query<DocumentData> = Query<DocumentData>>(
  p: ListSourceDef<T, C>
) {
  let ref: Query<DocumentData> = (!p.colGroupQuery) ? firestore.collection(p.path) : firestore.collectionGroup(p.path);

  if (p.query) ref = p.query(ref as C);

  if (p.convert) ref = ref.withConverter(p.convert);

  if (!p.once)
    return collectionData<T>(ref, p.idField as string);

  return fromPromise(ref.get()).pipe(map(listSnap => listSnap.docs.map(snap => snapToData(snap, p.idField as string) as T)));
}

interface ListSourceDef<T extends DocumentData, C extends CollectionReference | Query<DocumentData>> extends SourceDef<T> {
  query?: (q: C) => Query<DocumentData>,
  colGroupQuery?: boolean
}


interface SourceDef<T extends DocumentData> {
  path: string,
  convert?: FirestoreDataConverter<T>,
  idField?: keyof T,
  once?: boolean
}




