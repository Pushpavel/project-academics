import {fromPromise} from 'rxjs/internal-compatibility';
import {firestore} from '../../../firebase.app';
import firebase from 'firebase/app';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;
import DocumentData = firebase.firestore.DocumentData;
import {collectionData, docData, snapToData} from 'rxfire/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export function fetchObj<T extends DocumentData>(p: SourceDef<T>) {
  let ref = firestore.doc(p.path);
  if (p.convert) ref = ref.withConverter(p.convert);

  if (!p.once)
    return docData(ref, p.idField as string) as Observable<T>;

  return fromPromise(ref.get()).pipe(map(snap => snapToData(snap, p.idField as string) as T));
}

export function fetchList<T extends DocumentData>(p: SourceDef<T>) {
  let ref = firestore.collection(p.path);
  if (p.convert) ref = ref.withConverter(p.convert);

  if (!p.once)
    return collectionData<T>(ref, p.idField as string);

  return fromPromise(ref.get()).pipe(map(listSnap => listSnap.docs.map(snap => snapToData(snap, p.idField as string) as T)));
}

export interface SourceDef<T extends DocumentData> {
  path: string,
  convert?: FirestoreDataConverter<T>,
  idField?: keyof T,
  once?: boolean
}


