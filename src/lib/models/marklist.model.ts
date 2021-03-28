import {DocMeta} from '@lib/models/document.model';

export interface MarklistEntry {
  rollNo: string,
  name: string,
  mark: number,
}

export interface MarklistDocMeta extends DocMeta {

}
