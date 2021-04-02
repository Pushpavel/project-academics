import {Subject} from 'rxjs';

//  TODO: Use scan operator and avoid race conditions
export type ListSink<T, K extends keyof T> = Subject<Partial<T> & Pick<T, K>>

export type Sink<T> = Subject<Partial<T>>
