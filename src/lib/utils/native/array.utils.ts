import {range} from './number.utils';

export function divideArray<T>(array: T[], segmentLength: number) {
  const noOfSegments = Math.ceil(array.length / segmentLength);
  return range(noOfSegments).map(i => array.slice(i * segmentLength, (i + 1) * segmentLength));
}


