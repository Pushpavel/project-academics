import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {randFromRange} from 'lib/utils/native/number.utils';
import {DEPT_ABBR} from 'lib/constants/dept.constants';
import {DocumentStatSources} from 'lib/data/source/document-stat.source';
import {
  DocumentSources
} from 'lib/data/source/document.source';
import {DocumentSinks} from 'lib/data/document-sink.adapter';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  // TODO: caching

  statsDocumentQuery = this.statSources.statsDocumentQuery.bind(this.statSources);

  getStatsDocument = this.statSources.statsDocument.bind(this.statSources);
  getStudentNames = this.docSources.studentNames.bind(this.docSources);

  getPrivateMeta = this.docSources.privateDocumentMeta.bind(this.docSources);
  getPrivateDocumentEntries = this.docSources.privateDocumentEntries.bind(this.docSources);
  getProtectedMetas = this.docSources.protectedDocumentMetas.bind(this.docSources);

  sinkPrivateDocumentEntry = this.docSinks.privateDocumentEntriesSink.bind(this.docSinks);
  sinkPrivateDocumentMeta = this.docSinks.privateDocumentMetaSink.bind(this.docSinks);
  sinkPrivateGradingCriteriaEntry = this.docSinks.privateGradingCriteriaEntriesSink.bind(this.docSinks);


  getDeptwiseDocSubmissionOverview(semId: string, batchId: string) {
    // TODO: Implement this
    const entries = Object.keys(DEPT_ABBR).map(id => [DEPT_ABBR[id as keyof typeof DEPT_ABBR], randFromRange(0, 100)] as const);
    return of(new Map(entries));
  }

  constructor(
    private docSources: DocumentSources,
    private statSources: DocumentStatSources,
    private docSinks: DocumentSinks,
  ) {
  }
}
