import {Injectable} from '@angular/core';
import {MarklistEntry, MarklistEntryUI} from '@lib/models/marklist.model';
import {AttendanceEntry, AttendanceEntryUI} from '@lib/models/attendance.model';
import {combineLatest, Observable, of} from 'rxjs';
import {GradingCriteriaEntry, GradeEntryUI} from '@lib/models/grading.model';
import {randFromRange} from '@lib/utils/number.util';
import {DocumentId, DocumentMeta, DocumentStat} from '@lib/models/document.model';
import {DEPT_ABBR} from '@lib/constants/dept.constants';
import {courseDocumentStat, courseDocumentStats} from '@lib/data-adapters/document-stat.adapter';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {
  attendanceEntryUIModels,
  gradingCriteriaDocument, marklistEntryUIModels,
  privateDocumentMeta,
  privateRollNoEntries
} from '@lib/data-adapters/document.adapter';
import {DocumentPath} from '@lib/models/path.model';
import {studentNames} from '@lib/data-adapters/students.adapter';
import {MARK_DOCUMENTS} from '@lib/constants/document.constants';
import {computeGradeEntryUIModels} from '@lib/data-adapters/grading.adapter';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  getCourseDocStats = courseDocumentStats;
  getCourseDocStat = courseDocumentStat;

  getStat(semId: string, courseCode: string, documentId: string): Observable<DocumentStat> {
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

  getDocument(path: DocumentPath, isPrivate = false): Observable<[DocumentMeta, DocumentEntryUI[]]> {
    let meta: Observable<DocumentMeta>, entries: Observable<DocumentEntryUI[]>;
    if (path.documentId == 'GRADING_CRITERIA')
      return gradingCriteriaDocument(path, isPrivate);
    const studentNamesDoc = studentNames(path).pipe(shareReplay(1));

    switch (path.documentId) {
      case 'ATTENDANCE':
        meta = privateDocumentMeta(path).pipe(shareReplay(1));
        entries = combineLatest([meta, studentNamesDoc]).pipe(
          switchMap(([meta, studentNames]) => privateRollNoEntries<AttendanceEntry>(path).pipe(
            map(entries => attendanceEntryUIModels(entries, meta, studentNames))
          )),
        );
        break;
      case 'GRADES':
        const markEntriesArray = combineLatest(MARK_DOCUMENTS.map(documentId => privateRollNoEntries<MarklistEntry>({
          ...path,
          documentId
        }).pipe(
          map(entries => [documentId, entries] as const)
        )));
        meta = of({} as DocumentMeta);
        entries = combineLatest([gradingCriteriaDocument(path, true), markEntriesArray, studentNamesDoc])
          .pipe(map(([[meta, criteriaEntries], markEntries, studentNames]) =>
            computeGradeEntryUIModels(meta, criteriaEntries, new Map(markEntries), studentNames)
          ));
        break;
      default:
        meta = privateDocumentMeta(path).pipe(shareReplay(1));
        entries = combineLatest([privateRollNoEntries<MarklistEntry>(path), studentNamesDoc]).pipe(
          map(([entries, studentNames]) => marklistEntryUIModels(entries, studentNames))
        );
    }

    // TODO: Implement for public documents also
    return combineLatest([meta, entries]);
  }

  getMeta(semId: string, courseCode: string, documentId: DocumentId, isPrivate = false) {
    // TODO: Implement this
    return privateDocumentMeta({semId, courseCode, documentId});
  }

  getEntries<T extends DocumentEntryUI>(semId: string, courseCode: string, documentId: string, isPrivate = false): Observable<T[]> {
    // TODO: Implement this
    return of(new Array(40).fill(1).map((_, index) => (
        {
          rollNo: 'CS19B10' + index,
          name: 'Student ' + index,
          attended: randFromRange(0, 200),
          percentage: randFromRange(0, 100).toString()
        }) as AttendanceEntryUI
      ) as T[]
    );
  }
}

export type DocumentEntryUI = MarklistEntryUI | AttendanceEntryUI | GradeEntryUI | GradingCriteriaEntry
