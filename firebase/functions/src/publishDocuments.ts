
import * as functions from 'firebase-functions';

export const publishDocuments = (firestore: FirebaseFirestore.Firestore) => functions.region('asia-south1').https.onCall(async (data: any, context) => {

    const course_doc_ref = firestore.collection('Semesters').doc(data.sem_id).collection('Courses').doc(data.course_id)

    const course_snap = await course_doc_ref.get()
    const course_data = course_snap.data()

    if (course_data && course_data.facultyId === context.auth?.uid) {
        return { "error": "UnAuthorized" }
    }

    if (!data.document && !data.sem_id && !data.course_id)
        return { 'error': 'malformed data' }


    const private_doc_ref = course_doc_ref.collection('private_course_documents').doc(data.document)

    const root_data = await private_doc_ref.get()
    const exam_attd_entries = await private_doc_ref.collection('entries').get()

    //1.set editable to  false
    await course_doc_ref.collection('private_course_documents').doc(data.document).update({ editable: false })

    //2.create protected document and register

    const protec_course_collection_ref = course_doc_ref.collection('protected_course_documents')

    const map_docs_to_json = (docs: FirebaseFirestore.QuerySnapshot) => {
        let mapped_entries: { [Key: string]: number } = {}
        docs.forEach((doc) => {
            mapped_entries[doc.id] = doc.data()?.mark ? doc.data()?.mark as number : doc.data()?.attended as number
        })
        return mapped_entries
    }

    const entries_json = map_docs_to_json(exam_attd_entries)
    const generated_proct_doc = {
        document: private_doc_ref.id,
        ...course_data,
        total: root_data.data()?.total,
        entries: { ...entries_json }
    }

    await protec_course_collection_ref.doc(data.document).set(generated_proct_doc)

    //3.update public student entry

    const student_docs = await course_doc_ref.collection('public_student_documents').get()

    const std_data_write_batch = firestore.batch()

    student_docs.forEach(doc => {
        const updatedEntry = {
            entries: {
                ...doc.data()?.entries,
                [data.document]: {
                    total: root_data.data()?.total,
                    [data.document === 'ATTENDANCE' ? 'attended' : 'mark']: entries_json[doc.id],
                    publicTimestamp: Date.now()
                }
            }
        }
        std_data_write_batch.update(doc.ref, updatedEntry)
    })


    //4.update documents stat

    await firestore.runTransaction((transaction) => {
        const proc_stat_ref = protec_course_collection_ref.doc('DOCUMENT_STATS')
        return transaction.get(proc_stat_ref).then(doc => {
            if (doc.exists) {
                const updatedEntries = { entries: { ...doc.data()?.entries, [data.document]: { status: 'submitted', publicTimestamp: Date.now() } } }
                transaction.update(proc_stat_ref, updatedEntries)
            }
        })
    })

    return { 'remark': "doc submitted" }

});
