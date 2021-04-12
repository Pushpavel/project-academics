import {FetchService} from '@lib/data/base/firestore.source';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class SourceService {
  protected constructor(protected service: FetchService) {
  }
}
