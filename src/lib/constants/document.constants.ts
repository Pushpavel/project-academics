import {DocumentId} from '@models/document/document-base.model';

export const MARK_DOCUMENT_IDS = ['CT1', 'CT2', 'ASSIGNMENT', 'END_SEM'] as const;

export const PRIVATE_DOCUMENT_IDS = ['ATTENDANCE', ...MARK_DOCUMENT_IDS, 'GRADING_CRITERIA'] as const;

export const PUBLIC_DOCUMENT_IDS = ['ATTENDANCE', ...MARK_DOCUMENT_IDS, 'GRADES'] as const;

export const DOCUMENT_IDS = [...PRIVATE_DOCUMENT_IDS, 'GRADES'] as const;

export const DOCUMENT_NAMES: Record<DocumentId, string> = {
  ATTENDANCE: 'ATTENDANCE',
  CT1: 'CT 1',
  CT2: 'CT 2',
  ASSIGNMENT: 'ASSIGNMENT',
  END_SEM: 'END SEMESTER',
  GRADING_CRITERIA: 'GRADING CRITERIA',
  GRADES: 'GRADES',
} as const;
