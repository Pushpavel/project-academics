import {Deletable} from '@models/util.types';
import {CourseRaw} from '@models/course.model';
import * as admin from 'firebase-admin';
import {MARK_DOCUMENT_IDS, PRIVATE_DOCUMENT_IDS} from '../../../../src/lib/constants/document.constants';
import {PRIVATE_DOCUMENT_PATH} from '../../../../src/lib/constants/firestore.path';

const firestore = admin.firestore();

const TOTALS: Record<string, number> = {
  CT1: 20, CT2: 20, ASSIGNMENT: 10, END_SEM: 50, GRADING_CRITERIA: 100, ATTENDANCE: 0,
};

const GRADING_CRITERIA_ENTRIES = {S: 95, A: 90, B: 80, C: 70, D: 60, E: 50, F: 40,};

export async function createPrivateDocuments(courseCode: string, course: Deletable<CourseRaw, 'courseCode'>, rollNos: string[]) {

  const p = {
    semId: course.sem,
    courseCode,
  };

  const batch = firestore.batch();

  for (const id of PRIVATE_DOCUMENT_IDS)
    batch.set(firestore.doc(PRIVATE_DOCUMENT_PATH({...p, documentId: id})), {
      editable: true,
      total: TOTALS[id],
      entries: id == 'GRADING_CRITERIA' ? GRADING_CRITERIA_ENTRIES : undefined,
    });

  await batch.commit();

  const entriesPromises = [];

  for (const id of [...MARK_DOCUMENT_IDS, 'ATTENDANCE'] as const) {
    const entriesBatch = firestore.batch();
    const colRef = firestore.collection(`${PRIVATE_DOCUMENT_PATH({...p, documentId: id})}/entries`);
    for (const rollNo of rollNos)
      entriesBatch.set(colRef.doc(rollNo), {
        [id == 'ATTENDANCE' ? 'attended' : 'mark']: 0,
      });

    entriesPromises.push(entriesBatch.commit());
  }

  await Promise.all(entriesPromises);
}
