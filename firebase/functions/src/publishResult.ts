import * as admin from 'firebase-admin';
import {CallableContext} from 'firebase-functions/lib/providers/https';
import {DOCUMENT_IDS} from '../../../src/lib/constants/document.constants';
import {GradeEntryRaw} from '../../../src/lib/models/document/grading.model';
import {BatchPath} from '../../../src/lib/models/path.model';
import {FirestoreBatch} from '../../../src/lib/utils/firestore.utils';
import {AUTH_ERROR, INTERNAL_ERROR, INVALID_STATE_ERROR} from './error';
import {completed, error} from './error.utils';

import FieldValue = admin.firestore.FieldValue;

type GradeEntries = Record<string, Omit<GradeEntryRaw, 'rollNo'>>;

const firestore = admin.firestore();

const statsUpdate = DOCUMENT_IDS.reduce((obj, id) => {
  obj[`entries.${id}.status`] = 'public';
  obj[`entries.${id}.publicTimestamp`] = FieldValue.serverTimestamp();
  return obj;
}, {} as any);

export async function _publishResult(p: BatchPath, context: CallableContext) {

  if (!context.auth)
    return error(AUTH_ERROR, 'not authenticated');
  else if (!context.auth.token.isExamCell)
    return error(AUTH_ERROR, 'user is not exam cell', context.auth.token);

  // get stats document of courses of the batch
  const statsSnaps = await firestore.collectionGroup('protected_course_documents')
    .where('sem', '==', p.semId)
    .where('batch', '==', p.batchId)
    .where('document', '==', 'DOCUMENT_STATS').get();

  // verify whether all courses are submitted
  const isSubmitted = statsSnaps.docs.every(snap =>
    snap.get('entries.GRADES.status') == 'submitted'
  );

  if (!isSubmitted)
    return error(INVALID_STATE_ERROR, 'some courses of the batch are not submitted');

  // update document stats status to 'public'
  const statsBatch = new FirestoreBatch(firestore);

  for (const snap of statsSnaps.docs)
    statsBatch.perform(b => b.update(snap.ref, statsUpdate));

  // update grade field of student entries
  const gradesSnaps = await firestore.collectionGroup('protected_course_documents')
    .where('sem', '==', p.semId)
    .where('batch', '==', p.batchId)
    .where('document', '==', 'GRADES').get();

  const gradesBatch = new FirestoreBatch(firestore);

  for (const gradesDoc of gradesSnaps.docs)
    for (const [rollNo, entry] of Object.entries(gradesDoc.get('entries') as GradeEntries)) {
      const courseRef = gradesDoc.ref.parent.parent;

      if (!courseRef)
        return error(INTERNAL_ERROR, 'could not compute courseRef from gradesDoc', gradesDoc.ref);

      gradesBatch.perform(b => b.update(
        courseRef.collection('public_student_entries').doc(rollNo),
        {
          ['entries.GRADES']: {
            ...entry,
            publicTimestamp: FieldValue.serverTimestamp()
          }
        },
      ));
    }

  const promises = [
    statsBatch.commitAll().catch(e => error(INTERNAL_ERROR, 'statsBatch', p, e)),
    gradesBatch.commitAll().catch(e => error(INTERNAL_ERROR, 'gradesBatch', p, e)),
  ];

  const results = await Promise.all(promises);

  // check if errored
  const _error = results.find(r => !!(r as any).error);
  if (_error)
    return _error;

  return completed();
}
