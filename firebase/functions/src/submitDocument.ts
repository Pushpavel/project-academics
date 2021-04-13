import * as admin from 'firebase-admin';
import {CallableContext} from 'firebase-functions/lib/providers/https';
import FieldValue = admin.firestore.FieldValue;
import {DocumentPath} from '@models/path.model';

const firestore = admin.firestore();

export async function _submitDocument(p: DocumentPath, context: CallableContext) {

  try {

    if (!context.auth) return error('unauthorized');

    const courseRef = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}`);

    const course = (await courseRef.get()).data();

    if (!course || !p.semId || !p.courseCode || !(p.documentId in PRIVATE_DOCUMENT_IDS))
      return error('malformed data');
    else if (course?.facultyId === context.auth.uid)
      return error('unauthorized');


    const statRef = courseRef.collection('protected_course_documents').doc('DOCUMENT_STATS');
    const stat = (await statRef.get()).data() as any;
    const status = stat.entries[p.documentId]?.status;
    if (status && status != 'private' && status != 'remarked')
      return error('illegal state');

    const privateMetaRef = courseRef.collection('private_course_documents').doc(p.documentId);
    const protectedMetaRef = courseRef.collection('protected_course_documents').doc(p.documentId);
    const privateEntriesRef = privateMetaRef.collection('entries');

    // 1.set editable to  false
    privateMetaRef.update('editable', false);

    // 2.get private document meta and entries
    let entries, meta: any;
    if (p.documentId != 'GRADING_CRITERIA') {
      const [metaSnap, entriesSnap] = await Promise.all([privateMetaRef.get(), privateEntriesRef.get()]);

      entries = entriesListToMap(
        entriesSnap.docs.map(snap => snap.data() as any),
        p.documentId == 'ATTENDANCE' ? 'attended' : 'mark'
      );
      meta = metaSnap.data();
    } else
      meta = (await privateMetaRef.get()).data();

    delete meta?.editable;

    // 2.create protected document and register
    await protectedMetaRef.create({
      sem: course.sem,
      batch: course.batch,
      dept: course.dept,
      document: p.documentId,
      entries: entries ?? undefined,
      ...meta,
    });

    // 3.update document stat
    await statRef.update(`entries.${p.documentId}`, {
      status: 'submitted',
      timestamp: FieldValue.serverTimestamp()
    });

    if (p.documentId == 'GRADING_CRITERIA')
      return {remark: 'document submitted'};

    // 4.update public student entry
    const studentsRef = await courseRef.collection('public_student_documents');

    const batch = firestore.batch();

    entries?.forEach((entry: any) => batch.update(
      studentsRef.doc(entry.rollNo),
      `entries.${p.documentId}`, {
        ...meta,
        ...entry,
        publicTimestamp: FieldValue.serverTimestamp(),
      }
    ));

    await batch.commit();

    return {remark: 'document submitted'};

  } catch (e) {
    return error('internal error');
  }

}

function entriesListToMap(list: any[], valueField: 'attended' | 'mark') {
  const entries: any = {};

  for (const entry of list)
    entries[entry.rollNo] = (entry as any)[valueField];

  return entries;
}

const PRIVATE_DOCUMENT_IDS = ['ATTENDANCE', 'CT1', 'CT2', 'ASSIGNMENT', 'END_SEM', 'GRADING_CRITERIA'];

export function error(message: string) {
  return {
    error: message,
  };
}
