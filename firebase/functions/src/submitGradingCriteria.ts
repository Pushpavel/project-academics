// import * as admin from 'firebase-admin'
//
// import { CallableContext } from 'firebase-functions/lib/providers/https';
// import { error } from './error';
// import FieldValue = admin.firestore.FieldValue;
//
// const firestore = admin.firestore();
//
// export async function _submitGradingCriteria(p: any, context: CallableContext) {
//
//     const p_grading_criteria_doc_id = "GRADING_CRITERIA"
//
//     try {
//
//         if (!context.auth) return error('unauthorized');
//
//         const courseRef = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}`);
//
//         const course = (await courseRef.get()).data();
//
//         if (!course || !p.semId || !p.courseCode)
//             return error('malformed data');
//         else if (course?.facultyId === context.auth.uid)
//             return error('unauthorized');
//
//         const statRef = courseRef.collection('protected_course_documents').doc('DOCUMENT_STATS');
//         const stat = (await statRef.get()).data() as any;
//         const status = stat.entries[p_grading_criteria_doc_id]?.status;
//         if (status && status != 'private' && status != 'remarked')
//             return error('illegal state');
//
//         const privateMetaRef = courseRef.collection('private_course_documents').doc(p_grading_criteria_doc_id);
//         const protectedMetaRef = courseRef.collection('protected_course_documents').doc(p_grading_criteria_doc_id);
//
//         // 1.set editable to  false
//         privateMetaRef.update('editable', false);
//
//         // 2. publishing to protected
//
//         const p_grading_criteria_data = (await privateMetaRef.get()).data()
//
//         delete p_grading_criteria_data?.editable
//
//         await protectedMetaRef.create({ ...course, document: p_grading_criteria_doc_id, ...p_grading_criteria_data })
//
//         // 3.update document stat
//         await statRef.update(`entries.${p.documentId}`, {
//             status: 'submitted',
//             timestamp: FieldValue.serverTimestamp()
//         });
//
//         return { remark: "Grade Criteria submitted" }
//
//     } catch (error) {
//         return error("Internal Error")
//     }
//
// }
//
