import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ROUTING_REGEXES, RoutingParam} from 'lib/constants/routing.constants';

@Injectable({
  providedIn: 'root'
})
export class RegexGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const paramId = route.data.regexGuardParamId as RoutingParam;

    if (!paramId)
      throw new Error('RegexGuard must be provided with regexGuardParamId in data property of the route');

    const param = route.paramMap.get(paramId);
    const regex = ROUTING_REGEXES[paramId];
    return param && (!regex || regex.test(param)) || this.router.parseUrl('404');
  }

  constructor(private router: Router) {
  }
}


export const regexGuard = (paramId: RoutingParam) => ({
  canActivate: [RegexGuard], data: {regexGuardParamId: paramId}
});
