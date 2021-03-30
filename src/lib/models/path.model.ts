import {DocumentId} from '@lib/models/document.model';

export interface CoursePath {
  semId: string,
  courseCode: string,
}

export interface DocumentPath extends CoursePath {
  documentId: DocumentId
}
