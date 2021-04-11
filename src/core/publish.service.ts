import {Injectable} from '@angular/core';
import {CoursePath} from '@lib/models/path.model';
import {NonGradeDocumentId} from '@lib/models/document/document-base.model';

/**
 * manages publishing or revoking course documents
 */
@Injectable({
  providedIn: 'root'
})
export class PublishService {

  async publishDocument(path: CoursePath, documentId: NonGradeDocumentId) {
    // TODO: call publishDocument cloud function
    console.log('publishDocument', path, documentId);
    return true;
  }
}
