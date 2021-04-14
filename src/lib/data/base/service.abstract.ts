import {FetchService} from 'lib/data/base/firestore.source';
import {Injectable} from '@angular/core';
import {SinkService} from 'lib/data/base/firestore.sink';

@Injectable()
export abstract class SourceService {
  protected constructor(protected service: FetchService) {
  }
}

@Injectable()
export abstract class SinksService {
  protected constructor(protected service: SinkService) {
  }
}
