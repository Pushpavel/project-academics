import {CoursePath, DocumentPath} from '@lib/models/path.model';
import {
  NonGradeDocumentId,
  PrivateMetaRaw
} from '@lib/models/document/document-base.model';
import {MarklistEntryRaw} from '@lib/models/document/marklist.model';
import {AttendanceEntryRaw} from '@lib/models/document/attendance.model';
import {SinkOut} from '@lib/data-adapters/base/sink.interfaces';
import {GradingCriteriaEntryUI, PrivateGradingCriteriaMetaRaw} from '@lib/models/document/grading-criteria.model';
import {sinkObject} from '@lib/data-adapters/base/firestore.sink';
import {PRIVATE_DOCUMENT_PATH} from '@lib/constants/firestore.path';
import {gradingCriteriaMetaUpdateFromEntries} from '@lib/data-adapters/convert/grading-criteria-from.snapshot';
import {map} from 'rxjs/operators';


export function privateDocumentMetaSink<T extends PrivateMetaRaw>(p: DocumentPath, sink: SinkOut<T>) {
  return sinkObject({
    path: PRIVATE_DOCUMENT_PATH(p),
    sink
  });
}

export function privateDocumentEntriesSink<T extends MarklistEntryRaw | AttendanceEntryRaw>(
  p: CoursePath,
  documentId: NonGradeDocumentId,
  sink: SinkOut<T, 'rollNo'>
) {
  return sinkObject({
    path: PRIVATE_DOCUMENT_PATH({...p, documentId}) + '/entries',
    sink
  });

}

export function privateGradingCriteriaEntriesSink(
  p: CoursePath,
  sink: SinkOut<GradingCriteriaEntryUI, 'grade' | 'minMark'>
) {
  return privateDocumentMetaSink<PrivateGradingCriteriaMetaRaw>(
    {...p, documentId: 'GRADING_CRITERIA'},
    sink.pipe(map(gradingCriteriaMetaUpdateFromEntries))
  );
}
