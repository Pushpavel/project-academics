import * as admin from 'firebase-admin';
import {CallableContext} from 'firebase-functions/lib/providers/https';
import FieldValue = admin.firestore.FieldValue;
import {DocumentPath} from '@models/path.model';
import {completed, error} from './error.utils';
import {AUTH_ERROR, INTERNAL_ERROR, INVALID_DATA_ERROR, INVALID_STATE_ERROR} from './error';
import {PrivateMetaRaw} from '@models/document/document-base.model';
import {PrivateMarklistMetaRaw} from '@models/document/marklist.model';
import {PrivateAttendanceMetaRaw} from '@models/document/attendance.model';
import {CourseRaw} from '@models/course.model';
import {logger} from 'firebase-functions';
import QuerySnapshot = admin.firestore.QuerySnapshot;
import {queryMarkers} from './document.utils';


const firestore = admin.firestore();

export async function _submitDocument(p: DocumentPath, context: CallableContext) {

  if (!context.auth) return error(AUTH_ERROR, 'not authenticated');


  // get requested course
  const courseRef = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}`);
  const course = (await courseRef.get()).data() as CourseRaw;

  // validate params and whether user if faculty of the course
  if (!course || !PRIVATE_DOCUMENT_IDS.includes(p.documentId))
    return error(INVALID_DATA_ERROR, course, p.documentId);
  else if (course?.facultyId != context.auth.uid)
    return error(AUTH_ERROR, `${context.auth.uid} is not faculty of the course`, course);

  logger.log('🚀 submitting', p);

  // get stats document of the course
  const statRef = courseRef.collection('protected_course_documents').doc('DOCUMENT_STATS');
  const stat = (await statRef.get()).data() as any;

  const status = stat.entries[p.documentId]?.status;
  if (status && status != 'private' && status != 'remarked')
    return error(INVALID_STATE_ERROR, course, p, status);

  const privateMetaRef = courseRef.collection('private_course_documents').doc(p.documentId);
  const protectedMetaRef = courseRef.collection('protected_course_documents').doc(p.documentId);

  // 1.set editable to false
  await privateMetaRef.update('editable', false);

  // 2.get private document meta and entries
  const isGradingCriteria = p.documentId == 'GRADING_CRITERIA';
  const batch = firestore.batch();
  let meta: Partial<PrivateMetaRaw> & Omit<PrivateMetaRaw, 'editable'>;
  let entriesSnap: QuerySnapshot | undefined;

  if (!isGradingCriteria) {
    const [metaSnap, _entriesSnap] = await Promise.all([
      privateMetaRef.get(),
      privateMetaRef.collection('entries').get()
    ]);

    if (_entriesSnap.empty)
      return error(INVALID_STATE_ERROR, 'private entries are empty', _entriesSnap.query);
    entriesSnap = _entriesSnap;
    meta = metaSnap.data() as PrivateMetaRaw;
  } else
    meta = (await privateMetaRef.get()).data() as PrivateMarklistMetaRaw | PrivateAttendanceMetaRaw;

  if (!meta)
    return error(INVALID_STATE_ERROR, 'private meta does not exists', p, course);

  const entriesMap = entriesSnap && entriesListToMap(
    entriesSnap,
    p.documentId == 'ATTENDANCE'
  ) || undefined;

  delete meta.editable;

  // 2.create protected document
  batch.set(protectedMetaRef, {
    ...queryMarkers(course, p.documentId),
    entries: entriesMap ?? undefined,
    ...meta,
  });

  // 3.update document stat
  const docStatus = !isGradingCriteria ? 'submitted' : 'public';
  batch.update(statRef, `entries.${p.documentId}`, {
    status: docStatus,
    [`${docStatus}Timestamp`]: FieldValue.serverTimestamp()
  });

  if (isGradingCriteria) {
    await batch.commit();
    return completed();
  }

  // 4.update public student entry
  const studentsRef = courseRef.collection('public_student_entries');

  if (!entriesSnap)
    return error(INTERNAL_ERROR, 'entriesSnap null');

  for (const entry of entriesSnap.docs) {
    batch.update(
      studentsRef.doc(entry.id),
      `entries.${p.documentId}`, {
        ...meta,
        ...entry.data(),
        publicTimestamp: FieldValue.serverTimestamp(),
      }
    );
  }

  await batch.commit();

  return completed();
}


function entriesListToMap(snap: QuerySnapshot, hasAttendedField: boolean) {
  const entries: Record<string, number> = {};
  const valueField = hasAttendedField ? 'attended' : 'mark';

  for (const doc of snap.docs)
    entries[doc.id] = (doc.data() as any)[valueField];

  return entries;
}

const PRIVATE_DOCUMENT_IDS = ['ATTENDANCE', 'CT1', 'CT2', 'ASSIGNMENT', 'END_SEM', 'GRADING_CRITERIA'];
