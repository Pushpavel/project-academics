import {DocumentId} from '@lib/models/document.model';

export interface CoursePath {
  semId: string,
  courseCode: string,
}

export interface DocumentPath<T extends Partial<DocumentId> = DocumentId> extends CoursePath {
  documentId: T,
}
