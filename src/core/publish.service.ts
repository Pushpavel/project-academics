import {Injectable} from '@angular/core';
import {BatchPath, CoursePath} from 'lib/models/path.model';
import {NonGradeDocumentId} from 'lib/models/document/document-base.model';
import {AngularFireFunctions} from '@angular/fire/functions';

/**
 * manages publishing or revoking course documents
 */
@Injectable({
  providedIn: 'root'
})
export class PublishService {

  async submitDocument(path: CoursePath, documentId: NonGradeDocumentId) {
    return this.functions.httpsCallable('submitDocument')({...path, documentId}).toPromise();
  }

  async publishResult(p: BatchPath) {
    return this.functions.httpsCallable('publishResult')(p).toPromise();
  }

  constructor(private functions: AngularFireFunctions) {
  }
}
