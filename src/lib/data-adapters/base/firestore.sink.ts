import firebase from 'firebase/app';
import DocumentData = firebase.firestore.DocumentData;
import {firestore} from '../../../firebase.app';
import DocumentReference = firebase.firestore.DocumentReference;
import {Sink, SinkUpdate} from '@lib/data-adapters/base/sink.interfaces';

export function sinkObject<T extends DocumentData, K extends keyof T | never = never, P extends SinkUpdate<T, K> = any>(
  p: SinkDef<T, K, P>
) {

  let ref: DocumentReference;

  return p.sink.output.subscribe(updates => updates.forEach(async update => {//  TODO: Optimize updates
    // build ref
    const path = typeof p.path == 'string' ? p.path : p.path(update);
    const updateData = {...update};


    if (p.idField) {
      ref = firestore.collection(path).doc(update[p.idField]);
      // remove idField From updateData
      delete updateData[p.idField];

    } else
      ref = firestore.doc(path);


    await ref.update(updateData);

  }));

}


interface SinkDef<T extends DocumentData, K extends keyof T | never = never, P extends SinkUpdate<T, K> = any> {
  path: string | ((update: P) => string),
  idField?: K,
  sink: Sink<T, K, P>,
}
