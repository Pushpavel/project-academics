import firebase from 'firebase/app';
import {firestore} from '../../../firebase.app';
import DocumentReference = firebase.firestore.DocumentReference;
import {SinkOut} from '@lib/data-adapters/base/sink.interfaces';

export function sinkObject<T, K extends keyof T | never = never>(p: SinkDef<T, K>) {

  let ref: DocumentReference;

  return p.sink.subscribe(updates => updates.forEach(async update => {//  TODO: Optimize updates
    const updateData = {...update};

    // build ref
    if (p.idField) {
      ref = firestore.collection(p.path).doc(updateData[p.idField] as any);
      // remove idField From updateData
      delete updateData[p.idField];
    } else
      ref = firestore.doc(p.path);


    await ref.update(updateData);

  }));

}


interface SinkDef<T, K extends keyof T | never = never> {
  path: string,
  idField?: K,
  sink: SinkOut<T, K>,
}
