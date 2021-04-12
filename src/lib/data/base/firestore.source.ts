import firebase from 'firebase/app';
import {map} from 'rxjs/operators';
import {fromFirestore} from '@lib/data/base/convert.default';
import {AngularFirestore, AngularFirestoreCollectionGroup, QueryFn, QueryGroupFn} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {AngularFirestoreCollection} from '@angular/fire/firestore/collection/collection';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private db: AngularFirestore) {
  }

  /**
   * Converts DocumentSnapshot to T using idField or convert from @param p
   *
   * @param snap snapshot to convert from
   * @param p object containing idField or convert
   * @private
   */
  private static snapToData<T>(snap: DocumentSnapshot, p: SourceDef<T>): T | undefined {
    if (!snap.exists)
      return undefined;
    else if (p.convert)
      return p.convert(snap);
    else if (p.idField)
      return {
        ...snap.data(),
        [p.idField]: snap.id
      } as T;
    else
      return snap.data() as T;
  }

  /**
   * Fetches or observes a single Document from Firestore
   * @param p config for the query
   */
  fetchObj<T>(p: SourceDef<T>) {
    const ref = this.db.doc<T>(p.path);

    if (!p.sync)
      return ref.get().pipe(map(snap => FetchService.snapToData(snap, p)));

    return ref.snapshotChanges().pipe(
      map(change => FetchService.snapToData<T>(change.payload as DocumentSnapshot, p)),
    );
  }


  /**
   * Fetches or observes documents from a collection from Firestore or using a collectionQuery query
   * @param p config for query
   * @type C boolean to determine type of ListSourceDef<T,C>.query
   */
  fetchList<T, C extends boolean = false>(p: ListSourceDef<T, C>) {
    let ref: AngularFirestoreCollection | AngularFirestoreCollectionGroup;

    if (!p.colGroupQuery)
      ref = this.db.collection(p.path, p.query as QueryFn | undefined);
    else
      ref = this.db.collectionGroup(p.path, p.query as QueryGroupFn | undefined);

    if (!p.sync)
      return ref.get().pipe(
        map(snaps => snaps.docs.map(snap => FetchService.snapToData(snap, p) as T)
        )
      );

    return ref.snapshotChanges().pipe(
      map(changes => changes.map(change =>
          (FetchService.snapToData(change.payload.doc as DocumentSnapshot, p) as T)
        )
      )
    );
  }
}

interface ListSourceDef<T, C extends boolean = false> extends SourceDef<T> {
  query?: C extends false ? QueryFn : QueryGroupFn<T>,
  colGroupQuery?: C
}


interface SourceDef<T> {
  path: string,
  convert?: fromFirestore<T>,
  idField?: keyof T,
  once?: boolean,// TODO: remove this
  sync?: boolean,
}




