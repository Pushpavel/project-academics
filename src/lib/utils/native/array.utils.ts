import {range} from './number.utils';

export function divideArray<T>(array: T[], segmentLength: number) {
  const noOfSegments = Math.ceil(array.length / segmentLength);
  return range(noOfSegments).map(i => array.slice(i * segmentLength, (i + 1) * segmentLength));
}

export function reduce2dArray<T>(arr2d: T[][]) {
  return arr2d.reduce((acc, arr) => {
    acc.push(...arr);
    return acc;
  }, []);
}
