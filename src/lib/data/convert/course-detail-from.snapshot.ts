import {CourseDetailRaw} from '@lib/models/course.model';
import {fromFirestore} from '@lib/data/base/convert.default';

export const courseDetailFromSnapshot: fromFirestore<CourseDetailRaw> =
  (snapshot) => {
    return {
      ...snapshot.data(),
      courseCode: getCourseCodeFromPath(snapshot.ref.path)
    } as CourseDetailRaw;
  };


export function getCourseCodeFromPath(path: string) {
  return /courses\/(.*)\//.exec(path)?.[1] ?? 'Error';// TODO: Handle this
}
