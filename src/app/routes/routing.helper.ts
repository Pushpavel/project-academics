import {RoutingParam} from '@constants/routing.constants';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {filter, map, shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DocumentId} from '@models/document/document-base.model';
import {CoursePath, DocumentPath} from '@models/path.model';

export type RoutingParamsObject = Record<RoutingParam, string> & { documentId: DocumentId };
export type RoutingPathParams = CoursePath | DocumentPath

/**
 * Utility Function that gets paramMap as Object from ActivatedRoute (route)
 * and throws error if any requiredParams is missing
 *
 * @param requiredParams parameters to check for in paramMap of ActivatedRoute
 * @param route the ActivatedRoute service to get paramMap
 *
 * @returns Observable<T> where T is an object with keys requiredParams and value string
 */
export function getParams<T extends RoutingPathParams = RoutingParamsObject>(
  requiredParams: readonly RoutingParam[], route: ActivatedRoute
) {
  return route.paramMap.pipe(
    map(paramMapToObj),
    filter(params => {
      if (!requiredParams.every(param => params[param]))
        throw new Error(`Required Url Parameter ${requiredParams.find(param => !params[param])} not Found `);
      return true;
    }), // never emits if any required param is undefined
    shareReplay(1),
    // it is not guaranteed that the returned Object is of type Observable<T>
    // consider this workaround as an alternative to asserting the type after getting getParam's return value
  ) as unknown as Observable<T>;
}

export function paramMapToObj(map: ParamMap) {
  return map.keys.reduce((obj, key) => ({
    ...obj,
    [key]: map.get(key)
  }), {} as RoutingParamsObject);
}
