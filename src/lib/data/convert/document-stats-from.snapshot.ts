import {fromFirestore} from 'lib/data/base/convert.default';
import {mapObjectEntries} from '@utils/native/map.utils';
import {DOCUMENT_NAMES} from '@constants/document.constants';
import {StatEntryRaw, StatsDocumentRaw} from '@models/document/document-stat.model';
import {getCourseCodeFromPath} from 'lib/data/convert/course-detail-from.snapshot';
import {CourseDocumentStats} from '@models/course.model';
import {DocumentId} from '@models/document/document-base.model';

export const documentStatsFromSnapshot: fromFirestore<CourseDocumentStats> =
  (snapshot) => {
    // get course code from path
    const courseCode = getCourseCodeFromPath(snapshot.ref.path);

    // get raw data
    const data = snapshot.data() as StatsDocumentRaw;

    // build StatEntryRaw[]
    const stats = mapObjectEntries(DOCUMENT_NAMES, (id, documentName) => {
      // get statEntry from entries with this id
      //
      const statData = data.entries[id] ?? {};

      return {
        id,
        courseCode,
        documentName,
        semId: data.sem,
        status: 'private',
        ...statData
      } as StatEntryRaw;
    });

    return {
      courseCode,
      courseName: data.courseName,
      // we can safely assert the type of stats as we built the stats array
      // from DOCUMENTS_NAMES array which contains all DocumentIds
      // so no documentIds key in stats will be undefined
      stats: stats.reduce((obj, stat) => ({...obj, [stat.id]: stat}), {}) as Record<DocumentId, StatEntryRaw>
    };
  };
