import {CoursePath, DocumentPath} from '@lib/models/path.model';

export const COURSE_PATH = (p: CoursePath) =>
  `semesters/${p.semId}/courses/${p.courseCode}`;

export const PRIVATE_DOCUMENT_PATH = (p: DocumentPath) =>
  `${COURSE_PATH(p)}/private_course_documents/${p.documentId}`;
