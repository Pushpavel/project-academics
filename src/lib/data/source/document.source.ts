import {DocumentId, PrivateMetaRaw, ProtectedMetaRaw} from '@lib/models/document/document-base.model';
import {CoursePath} from '@lib/models/path.model';
import {AttendanceEntryRaw} from '@lib/models/document/attendance.model';
import {MarklistEntryRaw} from '@lib/models/document/marklist.model';
import {gradingCriteriaFromSnapshot} from '@lib/data/convert/grading-criteria-from.snapshot';
import {COURSE_PATH, PRIVATE_DOCUMENT_PATH, PUBLIC_DOCUMENT_PATH} from '@lib/constants/firestore.path';
import {NonGradeDocumentId, PrivateDocumentId} from '@lib/models/document/document-base.model';
import {Injectable} from '@angular/core';
import {SourceService} from '@lib/data/base/service.abstract';
import {objectToMap} from '@lib/utils/other.util';
import {StudentsDocumentRaw} from '@lib/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentSources extends SourceService {


  /**
   * fetches the firestore document that represents the Meta data of an Academic Document at location given by the params
   * @param p CoursePath object
   * @param documentId academic document id
   */
  privateDocumentMeta<T extends PrivateMetaRaw>(p: CoursePath, documentId: PrivateDocumentId) {
    let convert;

    if (documentId == 'GRADING_CRITERIA')
      convert = gradingCriteriaFromSnapshot;

    return this.service.fetchObj<T>({
      path: PRIVATE_DOCUMENT_PATH({...p, documentId}),
      convert: convert as any,
      once: true,
    });
  }

  /**
   * fetches all firestore documents in sub-collection 'entries' of an academic document at location given by params
   * @param p CoursePath object
   * @param documentId academic document id
   */
  privateDocumentEntries<T extends MarklistEntryRaw | AttendanceEntryRaw>(
    p: CoursePath, documentId: NonGradeDocumentId
  ) {
    return this.service.fetchList<T>({
      path: PRIVATE_DOCUMENT_PATH({...p, documentId}) + `/entries`,
      idField: 'rollNo',
      once: true,
    });
  }


  protectedDocumentMetas<T extends ProtectedMetaRaw>(p: CoursePath, documentIds: DocumentId[]) {
    return this.service.fetchList<T>({
      path: COURSE_PATH(p) + '/protected_course_documents',
      once: true,
      query: q => q.where('document', 'in', documentIds)
    });
  }


  studentNames(p: CoursePath) {
    return this.service.fetchObj<Map<string, string>>({
      path: PUBLIC_DOCUMENT_PATH(p, 'STUDENTS'),
      convert: snap => objectToMap((snap.data() as StudentsDocumentRaw).entries),
    });
  }
}