import {range} from '@lib/utils/number.util';

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
