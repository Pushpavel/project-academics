import {switchKeyValue} from '../utils/native/object.utils';

export const DEPT_ABBR = {
  CS: 'CSE',
  EC: 'ECE',
  EE: 'EEE',
  ME: 'MECH',
  CE: 'CIVIL'
};

export const DEPT_ID_FROM_ABBR = switchKeyValue(DEPT_ABBR);
