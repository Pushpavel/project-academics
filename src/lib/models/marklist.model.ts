import {DocMeta} from '@lib/models/other.model';

export interface MarklistEntry {
  rollNo: string,
  name: string,
  mark: number,
}

export interface MarklistDocMeta extends DocMeta {

}
