import {range} from '@lib/utils/number.util';

export function mapMapEntries<K, V, K2, V2>(map: Map<K, V>, predicate: (key: K, val: V) => [K2, V2]) {
  return new Map([...map.entries()].map(entry => predicate(entry[0], entry[1])));
}


export function divideArray<T>(array: T[], segmentLength: number) {
  const noOfSegments = Math.ceil(array.length / segmentLength);
  return range(noOfSegments).map(i => array.slice(i * segmentLength, (i + 1) * segmentLength));
}
