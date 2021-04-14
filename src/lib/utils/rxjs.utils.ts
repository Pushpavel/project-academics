import {combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

export function getValue<T>(...obsArray: Observable<T>[]) {
  return combineLatest(obsArray).pipe(take(1)).toPromise();
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
