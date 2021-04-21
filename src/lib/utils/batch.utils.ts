import {range} from './native/number.utils';
import {divideString} from './native/string.utils';

const romans = ['I', 'II', 'III', 'IV'];

export function getBatchName(semId: string, batchId: string) {
  const [_batchYear, batchCode] = divideString(batchId, 2);
  const [, _semYear] = divideString(semId, 2);

  // TODO: handle exception cases
  const no = parseInt(_semYear) - parseInt(_batchYear);
  return (batchCode == 'B1' ? 'B TECH ' : 'M TECH ') + romans[no];
}

export function getBatchId(semId: string, batchName: string) {
  const [, _semYear] = divideString(semId, 2);
  const [keyword, , romanYear] = batchName.split(' ');
  const no = parseInt(_semYear) - romans.findIndex(y => y == romanYear);
  return no + keyword + '1';
}

// TODO: Handle other batches also
export function generateBTechBatchIds(semId: string) {
  const [, _semYear] = divideString(semId, 2);
  const semYear = parseInt(_semYear);
  return range(4).map(i => (semYear - i) + 'B1');
}
