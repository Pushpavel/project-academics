import {RoutingParam} from '@lib/constants/routing.constants';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {filter, map, shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';

type RoutingParamsObject = Record<RoutingParam, string>;


export function getParams(requiredParams: readonly RoutingParam[], route: ActivatedRoute): Observable<RoutingParamsObject> {
  return route.paramMap.pipe(
    map(paramMapToObj),
    filter(params => {
      if (!requiredParams.every(param => params[param]))
        throw new Error(`Required Url Parameter ${requiredParams.find(param => !params[param])} not Found `);
      return true;
    }), // never emit if any required param is undefined
    shareReplay(1),
  );
}

export function paramMapToObj(map: ParamMap) {
  return map.keys.reduce((obj, key) => ({
    ...obj,
    [key]: map.get(key)
  }), {} as RoutingParamsObject);
}
