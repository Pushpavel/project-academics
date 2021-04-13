import {CoursePath, DocumentPath} from '@models/path.model';
import {DocumentId} from '@models/document/document-base.model';

export const COURSE_PATH = (p: CoursePath) =>
  `semesters/${p.semId}/courses/${p.courseCode}`;

export const PUBLIC_DOCUMENT_PATH = (p: CoursePath, documentId: string) =>
  `${COURSE_PATH(p)}/public_course_documents/${documentId}`;


export const PRIVATE_DOCUMENT_PATH = (p: DocumentPath) =>
  `${COURSE_PATH(p)}/private_course_documents/${p.documentId}`;

export const PROTECTED_DOCUMENT_PATH = (p: CoursePath, documentId: string | DocumentId) =>
  `${COURSE_PATH(p)}/protected_course_documents/${documentId}`;
