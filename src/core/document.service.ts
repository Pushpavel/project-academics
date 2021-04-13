import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {randFromRange} from '@lib/utils/number.util';
import {DEPT_ABBR} from '@lib/./constants/dept.constants';
import {DocumentStatSources} from '@lib/data/source/document-stat.source';
import {map} from 'rxjs/operators';
import {
  DocumentSources
} from '@lib/data/source/document.source';
import {DocumentPath} from '@lib/./models/path.model';
import {StatEntryRaw} from '@lib/./models/document/document-stat.model';
import {DocumentSinks} from '@lib/data/document-sink.adapter';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  // TODO: caching
  // TODO: connect sink to source

  getCourseDocStats = this.statSources.courseDocumentStats.bind(this.statSources);
  getCourseDocStat = this.statSources.courseDocumentStat.bind(this.statSources);
  getStudentNames = this.docSources.studentNames.bind(this.docSources);

  getPrivateMeta = this.docSources.privateDocumentMeta.bind(this.docSources);
  getPrivateDocumentEntries = this.docSources.privateDocumentEntries.bind(this.docSources);
  getProtectedMetas = this.docSources.protectedDocumentMetas.bind(this.docSources);

  sinkPrivateDocumentEntry = this.docSinks.privateDocumentEntriesSink.bind(this.docSinks);
  sinkPrivateDocumentMeta = this.docSinks.privateDocumentMetaSink.bind(this.docSinks);
  sinkPrivateGradingCriteriaEntry = this.docSinks.privateGradingCriteriaEntriesSink.bind(this.docSinks);


  getStat(p: DocumentPath): Observable<StatEntryRaw> {
    return this.getCourseDocStat(p).pipe(map(stats => {
      if (!stats)
        throw new Error('Document Stats does not exits'); //  TODO : handle gracefully
      return stats.stats[p.documentId];
    }));
  }


  getDeptwiseDocSubmissionOverview(semId: string, batchId: string) {
    // TODO: Implement this
    const entries = Object.keys(DEPT_ABBR).map(id => [DEPT_ABBR[id as keyof typeof DEPT_ABBR], randFromRange(0, 100)] as const);
    return of(new Map(entries));
  }

  getPublicMeta(path: DocumentPath): Observable<any> {
    throw new Error('Not Implemented');// TODO: Implement this
  }

  constructor(
    private docSources: DocumentSources,
    private statSources: DocumentStatSources,
    private docSinks: DocumentSinks,
  ) {
  }
}
