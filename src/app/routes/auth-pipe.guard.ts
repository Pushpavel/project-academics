import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, pipe, UnaryFunction} from 'rxjs';
import {UserService} from '@service/user.service';
import {map, take} from 'rxjs/operators';
import {AcademicUser} from '@lib/models/user.model';
import {loggedIn} from './routing.pipes';

export type AuthPipeGenerator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthPipe;
export type AuthPipe = UnaryFunction<Observable<AcademicUser | null>, Observable<boolean | string | any[]>>;

@Injectable({
  providedIn: 'root'
})
export class AuthPipeGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const authPipeFactory = route.data.authGuardPipe as AuthPipeGenerator || (() => loggedIn);

    return this.user.pipe(
      take(1),
      authPipeFactory(route, state),
      map(can => {
        if (typeof can === 'boolean')
          return can;
        else if (Array.isArray(can))
          return this.router.createUrlTree(can);
        else
          return this.router.parseUrl(can);
      })
    );
  }

  constructor(private user: UserService, private router: Router) {
  }

}

export const authGuard = (pipe: AuthPipeGenerator) => ({
  canActivate: [AuthPipeGuard], data: {authGuardPipe: pipe}
});


export const redirectUnauthorizedTo: (redirect: string | any[]) => AuthPipe =
  (redirect) => pipe(loggedIn, map(loggedIn => loggedIn || redirect));

export const redirectLoggedInTo: (redirect: string | any[]) => AuthPipe =
  (redirect) => pipe(loggedIn, map(loggedIn => loggedIn && redirect || true));
