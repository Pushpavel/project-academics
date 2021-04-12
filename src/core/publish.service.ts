import {Injectable} from '@angular/core';
import {CoursePath} from '@lib/models/path.model';
import {NonGradeDocumentId} from '@lib/models/document/document-base.model';
import {cloudFunction} from '../firebase.app';

/**
 * manages publishing or revoking course documents
 */
@Injectable({
  providedIn: 'root'
})
export class PublishService {

  async submitDocument(path: CoursePath, documentId: NonGradeDocumentId) {
    return await cloudFunction.httpsCallable('submitDocument')({...path, documentId});
  }
}
