import {Subject} from 'rxjs';

//  TODO: Use scan operator and avoid race conditions
export type Sink<T, K extends keyof T> = Subject<Partial<T> & Pick<T, K>>
