import {of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AuthPipe} from './auth-pipe.guard';
import {ObservableInput} from 'rxjs/src/internal/types';

export const loggedIn: AuthPipe = map(user => !!user);

export const thenRedirectToHome = switchMap((can: any) => {
    if (can == true)
      return of('/sem/2020_EVEN/home');//  TODO: fetch real current sem

    return of(can);
  }
);

export const elseStay = map((can: any) => can == false || can);

export const elseRedirectTo = <I, O>(redirect: string | any[]) =>
  map<I, O>((can: any) => (can == false) && redirect || can);

export const thenRedirectTo = <I, O>(redirect: string | any[]) =>
  map<I, O>((can: any) => (can == true) && redirect || can);

export const thenMap = <T extends any, R>(project: (val: T) => R) => {
  return map<T, R | T>(can => {
    if (can == true)
      return project(can);
    return can;
  });
};

export const thenSwitchMap = <T, O extends ObservableInput<any>>(project: (value: T, index: number) => O) => {
  return switchMap<T, O | ObservableInput<T>>((can, index) => {
    if (can as any == true)
      return project(can, index);
    return of(can);
  });
};
