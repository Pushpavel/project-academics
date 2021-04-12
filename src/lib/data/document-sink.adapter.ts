import {CoursePath, DocumentPath} from '@lib/models/path.model';
import {
  NonGradeDocumentId,
  PrivateMetaRaw
} from '@lib/models/document/document-base.model';
import {MarklistEntryRaw} from '@lib/models/document/marklist.model';
import {AttendanceEntryRaw} from '@lib/models/document/attendance.model';
import {SinkOut} from '@lib/data/base/sink.interfaces';
import {GradingCriteriaEntryUI, PrivateGradingCriteriaMetaRaw} from '@lib/models/document/grading-criteria.model';
import {PRIVATE_DOCUMENT_PATH} from '@lib/constants/firestore.path';
import {gradingCriteriaMetaUpdateFromEntries} from '@lib/data/convert/grading-criteria-from.snapshot';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {SinksService} from '@lib/data/base/service.abstract';

@Injectable({
  providedIn: 'root'
})
export class DocumentSinks extends SinksService {

  privateDocumentMetaSink<T extends PrivateMetaRaw>(p: DocumentPath, sink: SinkOut<T>) {
    return this.service.sinkObject({
      path: PRIVATE_DOCUMENT_PATH(p),
      sink
    });
  }

  privateDocumentEntriesSink<T extends MarklistEntryRaw | AttendanceEntryRaw>(
    p: CoursePath,
    documentId: NonGradeDocumentId,
    sink: SinkOut<T, 'rollNo'>
  ) {
    return this.service.sinkObject({
      path: PRIVATE_DOCUMENT_PATH({...p, documentId}) + '/entries',
      idField: 'rollNo',
      sink
    });
  }

  privateGradingCriteriaEntriesSink(
    p: CoursePath,
    sink: SinkOut<GradingCriteriaEntryUI, 'grade' | 'minMark'>
  ) {
    return this.privateDocumentMetaSink<PrivateGradingCriteriaMetaRaw>(
      {...p, documentId: 'GRADING_CRITERIA'},
      sink.pipe(map(gradingCriteriaMetaUpdateFromEntries))
    );
  }
}
