import {BehaviorSubject, Observable} from 'rxjs';
import firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;

/**
 * Observable with next function that buffers values if it does not have any subscribers
 *
 * @template T - Model interface
 * @template K - union of all the required keys of T
 */
export class Sink<T extends DocumentData, K extends keyof T | never = never> extends Observable<SinkUpdate<T, K>[]> {

  private buffer = new BehaviorSubject<SinkUpdate<T, K>[]>([]);

  constructor() {
    super(sub => this.buffer.subscribe(buf => {
      if (buf.length == 0) return;

      // dispatch buffer
      sub.next(buf);

      //  reset buffer
      this.buffer.next([]);
    }));
  }

  next(...value: SinkUpdate<T, K>[]) {
    if (value.length)
      this.buffer.next([...this.buffer.value, ...value]);
  }
}

/**
 * Object Representing a single update to a sink
 * @template T - Model interface
 * @template K - union of all the required keys of T
 */
export type SinkUpdate<T extends DocumentData, K extends keyof T | never> = Partial<T> & Pick<T, K>;

/**
 * Base Observable type which Sink<T> class extends
 * @template T - Model interface
 * @template K - union of all the required keys of T
 */
export type SinkOut<T extends DocumentData, K extends keyof T | never = never> = Observable<SinkUpdate<T, K>[]>
