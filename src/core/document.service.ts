import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {randFromRange} from '@lib/utils/number.util';
import {DEPT_ABBR} from '@lib/constants/dept.constants';
import {courseDocumentStat, courseDocumentStats} from '@lib/data-adapters/document-stat.adapter';
import {map} from 'rxjs/operators';
import {
  privateDocumentEntries,
  privateDocumentMeta, protectedDocumentMetas
} from '@lib/data-adapters/document.adapter';
import {DocumentPath} from '@lib/models/path.model';
import {
  privateDocumentEntriesSink, privateDocumentMetaSink, privateGradingCriteriaEntriesSink
} from '@lib/data-adapters/document-sink.adapter';
import {studentNames} from '@lib/data-adapters/students.adapter';
import {StatEntryRaw} from '@lib/models/document/document-stat.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  // TODO: caching
  // TODO: connect sink to source

  getCourseDocStats = courseDocumentStats;
  getCourseDocStat = courseDocumentStat;
  getStudentNames = studentNames;

  getPrivateMeta = privateDocumentMeta;
  getPrivateDocumentEntries = privateDocumentEntries;
  getProtectedMetas = protectedDocumentMetas;

  sinkPrivateDocumentEntry = privateDocumentEntriesSink;
  sinkPrivateDocumentMeta = privateDocumentMetaSink;
  sinkPrivateGradingCriteriaEntry = privateGradingCriteriaEntriesSink;


  getStat(p: DocumentPath): Observable<StatEntryRaw> {
    return this.getCourseDocStat(p).pipe(map(stats => stats.stats[p.documentId]));
  }


  getDeptwiseDocSubmissionOverview(semId: string, batchId: string) {
    // TODO: Implement this
    const entries = Object.keys(DEPT_ABBR).map(id => [DEPT_ABBR[id as keyof typeof DEPT_ABBR], randFromRange(0, 100)] as const);
    return of(new Map(entries));
  }

  getPublicMeta(path: DocumentPath): Observable<any> {
    throw new Error('Not Implemented');// TODO: Implement this
  }

}
