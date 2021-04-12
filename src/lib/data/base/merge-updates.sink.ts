import {SinkUpdate} from '@lib/data/base/sink.interfaces';
import firebase from 'firebase/app';
import DocumentData = firebase.firestore.DocumentData;

export function mergeUpdates<T extends DocumentData, K extends keyof T>(idField: K) {
  return (...inputs: SinkUpdate<T, K>[][]) => {
    const updateMap = new Map<string, SinkUpdate<T, K>>();

    for (const inputArray of inputs)
      for (const update of inputArray) {
        const updateData = updateMap.get(update[idField]);
        updateMap.set(update[idField], {...(updateData ?? {}), ...update});
      }

    return [...updateMap.values()];
  };
}
