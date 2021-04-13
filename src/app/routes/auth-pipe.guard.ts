import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, UnaryFunction} from 'rxjs';
import {UserService} from '@service/user.service';
import {map, take} from 'rxjs/operators';
import {AcademicUser} from '@models/user.model';
import {loggedIn} from './routing.pipes';
import {AngularFirestore} from '@angular/fire/firestore';

export type AuthPipeGenerator = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, afs: AngularFirestore) => AuthPipe;
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
      authPipeFactory(route, state, this.afs),
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

  constructor(
    private user: UserService,
    private router: Router,
    private afs: AngularFirestore) {

  }

}

export const authGuard = (pipe: AuthPipeGenerator) => ({
  canActivate: [AuthPipeGuard], data: {authGuardPipe: pipe}
});
