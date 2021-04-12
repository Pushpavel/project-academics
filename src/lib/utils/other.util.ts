import {range} from '@lib/utils/number.util';
import {combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

export function mapMapEntries<K, V, K2, V2>(map: Map<K, V>, predicate: (key: K, val: V) => [K2, V2]) {
  return new Map([...map.entries()].map(entry => predicate(entry[0], entry[1])));
}


export function divideArray<T>(array: T[], segmentLength: number) {
  const noOfSegments = Math.ceil(array.length / segmentLength);
  return range(noOfSegments).map(i => array.slice(i * segmentLength, (i + 1) * segmentLength));
}

export function mapObjectEntries<T, V>(obj: T, predicate: <K extends keyof T>(key: K, val: T[K]) => V) {
  return Object.keys(obj).map(key => predicate(key as keyof T, obj[key as keyof T]));
}

export function objectToMap<K extends keyof any, V>(obj: Record<K, V>): Map<K, V> {
  return new Map(mapObjectEntries(obj, (key, val) => [key, val] as [K, V]));
}

export function getValue<T>(...obsArray: Observable<T>[]) {
  return combineLatest(obsArray).pipe(take(1)).toPromise();
}

export function sortByKey<T>(keyField: keyof T, descending?: boolean) {
  return map((arr: T[]) =>
    arr.sort((a, b) => {
      if (a[keyField] > b[keyField])
        return descending ? -1 : 1;
      else if (a[keyField] < b[keyField])
        return descending ? 1 : -1;
      else
        return 0;
    })
  );
}
