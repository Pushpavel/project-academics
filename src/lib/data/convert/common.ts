import {fromFirestore} from 'lib/data/base/convert.default';

export function courseCodeExtract<T extends { courseCode: string }>(): fromFirestore<T> {
  return snapshot => ({
    ...snapshot.data(),
    courseCode: getCourseCodeFromPath(snapshot.ref.path)
  } as T);
}

export function getCourseCodeFromPath(path: string) {
  return path.split('/')[3];
}
