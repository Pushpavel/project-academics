import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {randFromRange} from '@lib/utils/number.util';
import {DEPT_ABBR} from '@lib/constants/dept.constants';
import {courseDocumentStat, courseDocumentStats} from '@lib/data-adapters/document-stat.adapter';
import {map} from 'rxjs/operators';
import {
  privateDocumentEntries,
  privateDocumentMeta
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


  getCourseDocStats = courseDocumentStats;
  getCourseDocStat = courseDocumentStat;
  getStudentNames = studentNames;

  getPrivateMeta = privateDocumentMeta;
  getPrivateDocumentEntries = privateDocumentEntries;

  sinkPrivateDocumentEntry = privateDocumentEntriesSink;
  sinkPrivateDocumentMeta = privateDocumentMetaSink;
  sinkPrivateGradingCriteriaEntry = privateGradingCriteriaEntriesSink;


  getStat(semId: string, courseCode: string, documentId: string): Observable<StatEntryRaw> {
    return this.getCourseDocStat(semId, courseCode).pipe(
      // tslint:disable-next-line:no-non-null-assertion TODO: HANDLE THIS
      map(stats => stats.stats.get(documentId)!)
    );
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
