// we didn't import firestore directly to make sure we can use these utils
// in both firebase/functions and in angular
// we derive other types from this type
type FirestoreLike = { batch(): any }


/**
 * Wrapper class that helps to overcome the 500 document writes per batch limit of firebase.batch()
 * creates a batch for every 500 document writes
 */
export class FirestoreBatch<F extends FirestoreLike, B extends ReturnType<F['batch']>> {

  batches: B[] = [];
  currentBatchLength = 0;

  constructor(private firestore: F) {
  }

  perform(predicate: (b: B) => any) {
    if (this.currentBatchLength % 500 == 0)
      this.batches.push(this.firestore.batch());
    this.currentBatchLength++;
    predicate(this.batches[this.batches.length - 1]);
    return this;
  };

  commitAll(): Promise<ReturnType<B['commit']>[]> {
    return Promise.all(this.batches.map(b => b.commit()));
  }
}
