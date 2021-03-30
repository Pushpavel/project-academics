import {firestore} from '../../firebase.app';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {CourseDetail} from '@lib/models/course.model';

export function courseDetail(semId: string, courseCode: string) {
  const ref = firestore.doc(`semesters/${semId}/courses/${courseCode}`);
  return fromPromise(ref.get()).pipe(
    map(doc => {
      return {...doc.data(), courseCode} as CourseDetail;
    })
  );

}
