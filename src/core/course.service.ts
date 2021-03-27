import {Injectable} from '@angular/core';
import {Course, CourseDocumentStat} from '@lib/models/course.model';
import {firestore} from 'firebase.app';
import {collectionData, docData} from 'rxfire/firestore';
import {BehaviorSubject, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {DocStatus} from '@lib/models/other.model';
import DOCUMENT_NAMES from '@lib/constants/document.constants';


@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private courseCollectionListener = new BehaviorSubject<any>(null);

  private courseListener = new BehaviorSubject<Course | null>(null);

  get courseCollection() {
    return this.courseCollectionListener.asObservable();
  }

  get course() {
    return this.courseListener.asObservable();
  }

  fetchCourseCollection(faculty_id: string): void {
    const courseRef = firestore.collection(`/semesters/2020_EVEN/courses`).where('faculty_id', '==', faculty_id);

    collectionData(courseRef, 'id').pipe(
      map(e => {
        return e.reduce((collections: any, course: any) => {
          collections[course.batch] = [{CourseName: course.name, courseId: course.id} as Course];
          return collections;
        }, {});
      })
    )
      .subscribe((coursesCollection => {
        this.courseCollectionListener.next(coursesCollection);
      }));

  }

  fetchCourse(courseId: string): void {
    const courseRef = firestore.doc(`/semesters/2020_EVEN/courses/${courseId}`);
    docData(courseRef).subscribe(courseData => {
      console.log(courseData);
    });
  }

  getCourse(courseCode: string) {
    // TODO: Implement this
    return of({
      courseId: courseCode,
      CourseName: 'Super Course Name',
    } as Course);
  }

  getCourseDocumentStats(courseCode: string) {
    // TODO: Implement this
    return of(Object.keys(DOCUMENT_NAMES).map(id => ({
        courseCode, id,
        name: DOCUMENT_NAMES[id],
        status: DocStatus.PRIVATE,
        timestamp: 881818181,
      } as CourseDocumentStat)
    ));
  }
}
