import {SinkOut} from '@lib/data/base/sink.interfaces';
import {switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SinkService {

  constructor(private db: AngularFirestore) {
  }

  sinkObject<T, K extends keyof T | never = never>(p: SinkDef<T, K>) {

    let ref: AngularFirestoreDocument;

    return p.sink.pipe(
      switchMap(updates => {
          const promises = updates.map(async update => {
            const updateData = {...update};

            // build ref
            if (p.idField) {
              ref = this.db.collection(p.path).doc(updateData[p.idField] as any);
              // remove idField From updateData
              delete updateData[p.idField];
            } else
              ref = this.db.doc(p.path);

            return await ref.update(updateData);
          });

          return fromPromise(Promise.all(promises));
        }
      )
    );

  }
}

interface SinkDef<T, K extends keyof T | never = never> {
  path: string,
  idField?: K,
  sink: SinkOut<T, K>,
}
