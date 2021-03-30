import {CoursePath} from '@lib/models/path.model';
import {firestore} from '../../firebase.app';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {StudentsDocumentRaw} from '@lib/models/student.model';
import {objectToMap} from '@lib/utils/other.util';

export function studentNames(p: CoursePath) {
  const ref = firestore.doc(`semesters/${p.semId}/courses/${p.courseCode}/public_course_documents/STUDENTS`);

  return fromPromise(ref.get()).pipe(
    map(snap => objectToMap((snap.data() as StudentsDocumentRaw).entries))
  );
}
