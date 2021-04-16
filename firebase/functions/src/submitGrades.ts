import {CoursePath} from '@models/path.model';
import {MARK_DOCUMENT_IDS, PRIVATE_DOCUMENT_IDS} from '../../../src/lib/constants/document.constants';
import {computeGrade, computePartialTotal} from '../../../src/lib/utils/grades.utils';
import {completed, error} from './error.utils';
import {AUTH_ERROR, INTERNAL_ERROR, INVALID_DATA_ERROR, INVALID_STATE_ERROR} from './error';
import {CourseRaw} from '@models/course.model';
import {logger} from 'firebase-functions';
import {CallableContext} from 'firebase-functions/lib/providers/https';
import * as admin from 'firebase-admin';
import {StatsDocumentRaw} from '@models/document/document-stat.model';
import {ProtectedMarklistMetaRaw} from '@models/document/marklist.model';
import {GradeEntryRaw} from '@models/document/grading.model';
import {ProtectedGradingCriteriaMetaRaw} from '@models/document/grading-criteria.model';
import {queryMarkers} from './document.utils';
import FieldValue = admin.firestore.FieldValue;

const firestore = admin.firestore();

export async function _submitGrades(p: CoursePath, context: CallableContext) {

  if (!context.auth) return error(AUTH_ERROR, 'not authenticated');


  // get requested course
  const courseRef = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}`);
  const course = (await courseRef.get()).data() as CourseRaw;

  // validate params and whether user if faculty of the course
  if (!course)
    return error(INVALID_DATA_ERROR, course);
  else if (course?.facultyId != context.auth.uid)
    return error(AUTH_ERROR, `${context.auth.uid} is not faculty of the course`, course);

  logger.log('🚀 submitting', p);


  // get required protected documents
  const protectedDocsRef = courseRef.collection('protected_course_documents');
  const protectedDocsSnaps = await protectedDocsRef
    .where('document', 'in', [...MARK_DOCUMENT_IDS, 'GRADING_CRITERIA', 'DOCUMENT_STATS'])
    .get();

  const stat = protectedDocsSnaps.docs.find(snap => snap.id == 'DOCUMENT_STATS')?.data() as StatsDocumentRaw;

  // verify whether grade is already submitted
  const gradeStatus = stat.entries.GRADES?.status;
  if (gradeStatus && gradeStatus != 'private' && gradeStatus != 'remarked')
    return error(INVALID_STATE_ERROR, stat);

  // verify whether all private documents are submitted
  const isPrivateDocsSubmitted = PRIVATE_DOCUMENT_IDS.every(id => {
    const status = stat.entries[id];
    return status && status != 'private' && status != 'remarked';
  });

  if (!isPrivateDocsSubmitted)
    return error(INVALID_STATE_ERROR, course, p, status);


  // calculate total marks
  const totalMap = computePartialTotal(MARK_DOCUMENT_IDS.map(id =>
    protectedDocsSnaps.docs.find(snap => snap.id == id)?.data() as ProtectedMarklistMetaRaw
  ));

  //  get grading criteria meta
  const criteria = protectedDocsSnaps.docs
    .find(snap => snap.id == 'GRADING_CRITERIA')
    ?.data() as ProtectedGradingCriteriaMetaRaw | undefined;

  if (!criteria)
    return error(INVALID_STATE_ERROR, 'no criteria document', p);

  // compute grade Entries for each rollNo
  const gradeEntries: Record<string, Omit<GradeEntryRaw, 'rollNo'>> = {};

  for (const rollNo of totalMap.keys()) {
    const total = totalMap.get(rollNo);

    if (total == undefined)
      return error(INTERNAL_ERROR, 'total is null');

    gradeEntries[rollNo] = {
      total,
      grade: computeGrade(total, criteria),
    };
  }


  const gradesRef = courseRef.collection('protected_course_documents').doc('GRADES');

  const batch = firestore.batch();

  // set grades document
  batch.set(gradesRef, {
    ...queryMarkers(course, 'GRADES'),
    entries: gradeEntries,
  });

  // update stats document
  batch.update(protectedDocsRef.doc('DOCUMENT_STATS'), `entries.GRADES`, {
    status: 'submitted',
    submittedTimestamp: FieldValue.serverTimestamp()
  });

  await batch.commit();

  return completed();
}
