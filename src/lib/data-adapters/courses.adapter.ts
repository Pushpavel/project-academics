import {firestore} from '../../firebase.app';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {CourseRaw, CourseDetailRaw} from '@lib/models/course.model';

export function courseDetail(semId: string, courseCode: string) {
  const ref = firestore.doc(`semesters/${semId}/courses/${courseCode}/public_course_documents/COURSE_DETAIL`);
  return fromPromise(ref.get()).pipe(
    map(doc => ({...doc.data(), courseCode} as CourseDetailRaw))
  );
}


export function course(semId: string, courseCode: string) {
  const ref = firestore.doc(`semesters/${semId}/courses/${courseCode}`);
  return fromPromise(ref.get()).pipe(
    map(doc => ({...doc.data(), courseCode} as CourseRaw))
  );
}
