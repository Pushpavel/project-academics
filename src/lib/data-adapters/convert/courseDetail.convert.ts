import firebase from 'firebase/app';
import {CourseDetailRaw} from '@lib/models/course.model';
import {converter} from '@lib/data-adapters/base/convert.default';

export const courseDetailConvert = converter({
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot): CourseDetailRaw {
    return {...snapshot.data(), courseCode: getCourseCodeFromPath(snapshot.ref.path)} as CourseDetailRaw;
  },
});

function getCourseCodeFromPath(path: string) {
  return /courses\/(.*)\//.exec(path)?.[1] ?? 'Error';// TODO: Handle this
}
