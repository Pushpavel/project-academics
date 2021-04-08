import {BehaviorSubject, Subject} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;

export type ListSink<T, K extends keyof T> = Subject<Partial<T> & Pick<T, K>>

/**
 * Subject that buffers values whenever Sink<T>.output observable has no subscribers
 *
 * @template T - Model interface
 * @template K - required keys in T
 * @template P - the resultant type each update should be
 */
export class Sink<T extends DocumentData,
  K extends keyof T | never = never,
  P extends Partial<T> & Pick<T, K> = any> {

  private buffer = new BehaviorSubject<Partial<T>[]>([]);

  output = this.buffer.pipe(
    filter(buf => buf.length > 0),
    tap(() => this.buffer.next([]))  // reset buffer
  );

  next(...value: P[]) {
    if (value.length)
      this.buffer.next([...this.buffer.value, ...value]);
  }
}
