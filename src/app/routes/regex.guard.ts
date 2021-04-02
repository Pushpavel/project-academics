import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ROUTING_REGEXES, RoutingParam} from '@lib/constants/routing.constants';

@Injectable({
  providedIn: 'root'
})
export class RegexGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isValid = route.paramMap.keys.every(paramKey => {
      const regex = ROUTING_REGEXES[paramKey as RoutingParam];
      const param = route.paramMap.get(paramKey);
      return param && (!regex || regex.test(param));
    });

    return isValid || this.router.parseUrl('404');
  }

  constructor(private router: Router) {
  }
}
