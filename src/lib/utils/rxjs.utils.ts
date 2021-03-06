import {Observable} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';

export function getValue<T>(obs: Observable<T>) {
  return obs.pipe(take(1)).toPromise();
}


export function sortByKey<T>(keyField: keyof T, descending?: boolean) {
  return map((arr: T[]) =>
    arr.sort((a, b) => {
      if (a[keyField] > b[keyField])
        return descending ? -1 : 1;
      else if (a[keyField] < b[keyField])
        return descending ? 1 : -1;
      else
        return 0;
    })
  );
}

export const notNull = filter(<T>(value: T | null | undefined): value is T => value != null);
