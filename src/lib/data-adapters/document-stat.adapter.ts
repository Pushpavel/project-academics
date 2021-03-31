import {firestore} from '../../firebase.app';
import {collection, doc} from 'rxfire/firestore';
import {DocumentStat, StatsDocumentRaw} from '@lib/models/document.model';
import {map} from 'rxjs/operators';
import {DOCUMENT_NAMES} from '@lib/constants/document.constants';
import {mapObjectEntries} from '@lib/utils/other.util';
import {CourseDocumentStats} from '@lib/models/course.model';


export function courseDocumentStat(semId: string, courseCode: string) {
  const ref = firestore.doc(`semesters/${semId}/courses/${courseCode}/protected_course_documents/DOCUMENT_STATS`);
  return doc(ref).pipe(map(snapshot => courseDocStatsModel(snapshot.data() as any, courseCode)));
}

export function courseDocumentStats(query: { semId: string, batchId?: string, deptId?: string }) {
  let ref = firestore.collectionGroup('protected_course_documents')
    .where('document', '==', 'DOCUMENT_STATS')
    .where('sem', '==', query.semId);
  if (query.batchId)
    ref = ref.where('batch', '==', query.batchId);
  if (query.deptId)
    ref = ref.where('dept.' + query.deptId, '!=', false);

  return collection(ref).pipe(
    map(snapshots => snapshots.map(snapshot =>
      courseDocStatsModel(snapshot.data() as any, getCourseCodeFromPath(snapshot.ref.path)))
    )
  );
}


function courseDocStatsModel(data: StatsDocumentRaw, courseCode: string): CourseDocumentStats {

  const stats = mapObjectEntries(DOCUMENT_NAMES, (id, documentName) => {
    const stat: DocumentStat = {
      id,
      courseCode,
      documentName,
      semId: data.sem,
      status: 'private',
    };
    const statData = data.entries[id];
    if (statData) {
      stat.status = statData.status as any; //  TODO: use Type guard
      stat.timestamp = statData.timestamp;
    }
    return stat;
  });

  return {
    courseCode,
    courseName: data.courseName,
    stats: new Map(stats.map(stat => [stat.id, stat]))
  };
}

function getCourseCodeFromPath(path: string) {
  return /courses\/(.*)\//.exec(path)?.[1] ?? 'Error';// TODO: Handle this
}
