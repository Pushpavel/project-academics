import {ROUTING_PARAMS} from '@lib/constants/routing.constants';
import {ActivatedRoute} from '@angular/router';
import {filter, map, shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';

// TODO: separate param validating logic to a RouteGuard which also should handle redirects to 404
// TODO: this function should only convert paramMap to object
export function getParams(requiredParams: Params, route: ActivatedRoute): Observable<typeof ROUTING_PARAMS> {
  return route.paramMap.pipe(
    map(paramMap => {
        // convert Map to object extracting only the requiredParams
        const params: Partial<typeof ROUTING_PARAMS> = {};

        for (const param of requiredParams)
          params[param] = paramMap.get(ROUTING_PARAMS[param]) ?? undefined;

        // Actual type of params is Partial<typeof ROUTING_PARAMS>
        // but, we are sure that the requiredParams values will never be undefined
        // as it won't go past filter operator below
        return params as typeof ROUTING_PARAMS;
      }
    ),
    filter(params => requiredParams.every(param => params[param])), // never emit if any required param is invalid
    shareReplay(1),
  );
}

type Params = (keyof typeof ROUTING_PARAMS)[]
