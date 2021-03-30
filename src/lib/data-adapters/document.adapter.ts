import {DocumentMeta, DocumentId} from '@lib/models/document.model';
import {firestore} from '../../firebase.app';
import {docData} from 'rxfire/firestore';

export function privateDocumentMeta(semId: string, courseCode: string, documentId: DocumentId) {
  const ref = firestore.doc(`semesters/${semId}/courses/${courseCode}/private_course_documents/${documentId}`);

  return docData<DocumentMeta>(ref);
}
//
// export function privateDocumentEntries(semId: string, courseCode: string, documentId: DocumentId) {
//   const col = firestore.collection(`semesters/${semId}/courses/${courseCode}/private_course_documents/${documentId}/entries`);
//   return collectionData<DocumentEntry>(col, documentId == 'GRADING_CRITERIA' ? 'grade' : 'rollNo');
// }
