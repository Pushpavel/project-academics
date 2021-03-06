import {DocumentId, PrivateMetaRaw, ProtectedMetaRaw} from '@models/document/document-base.model';
import {CoursePath, DocumentPath} from '@models/path.model';
import {AttendanceEntryRaw} from '@models/document/attendance.model';
import {MarklistEntryRaw} from '@models/document/marklist.model';
import {COURSE_PATH, PRIVATE_DOCUMENT_PATH, PUBLIC_DOCUMENT_PATH} from 'lib/constants/firestore.path';
import {NonGradeDocumentId, PrivateDocumentId} from '@models/document/document-base.model';
import {Injectable} from '@angular/core';
import {SourceService} from 'lib/data/base/service.abstract';
import {objectToMap} from 'lib/utils/native/map.utils';
import {StudentsDocumentRaw} from '@models/student.model';

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
    return this.service.fetchObj<T>({
      path: PRIVATE_DOCUMENT_PATH({...p, documentId}),
    });
  }

  /**
   * fetches all firestore documents in sub-collection 'entries' of an academic document at location given by params
   * @param p CoursePath object
   */
  privateDocumentEntries<T extends MarklistEntryRaw | AttendanceEntryRaw>(
    p: DocumentPath<NonGradeDocumentId>
  ) {
    return this.service.fetchList<T>({
      path: PRIVATE_DOCUMENT_PATH(p) + `/entries`,
      idField: 'rollNo',
    });
  }


  protectedDocumentMetas<T extends ProtectedMetaRaw>(p: CoursePath, documentIds: DocumentId[]) {
    return this.service.fetchList<T>({
      path: COURSE_PATH(p) + '/protected_course_documents',
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
