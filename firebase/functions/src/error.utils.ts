import {logger} from 'firebase-functions';
import {NO_ERROR} from './error';


export function error(code: number, ...data: any[]) {
  logger.error(code, ...data);
  return {
    error: code,
    data,
  };
}


export function completed() {
  return {success: NO_ERROR};
}


