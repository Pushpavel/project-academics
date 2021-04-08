import {of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AuthPipe} from './auth-pipe.guard';

export const loggedIn: AuthPipe = map(user => !!user);

export const thenRedirectToHome = () => switchMap((can: any) => {
    if (can == true)
      return of('/sem/2020_EVEN/home');//  TODO: fetch real current sem

    return of(can);
  }
);

export const elseRedirectTo = <I, O>(redirect: string | any[]) =>
  map<I, O>((can: any) => (can == false) && redirect || can);
