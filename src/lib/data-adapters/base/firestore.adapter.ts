import {fromPromise} from 'rxjs/internal-compatibility';
import {firestore} from '../../../firebase.app';
import firebase from 'firebase/app';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;
import DocumentData = firebase.firestore.DocumentData;
import {snapToData} from 'rxfire/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export function fetchObj<T extends DocumentData>(p: Params<T>) {
  let ref = firestore.doc(p.path);
  if (p.convert) ref = ref.withConverter(p.convert);

  let observable: Observable<any> = fromPromise(ref.get());

  if (p.idField)
    observable = observable.pipe(map(snap => snapToData(snap, p.idField as string) as DocumentData));

  return observable;
}

interface Params<T extends DocumentData> {
  path: string,
  convert?: FirestoreDataConverter<T>,
  idField?: keyof T,
}


