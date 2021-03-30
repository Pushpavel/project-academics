import {Injectable} from '@angular/core';
import {CourseDetail} from '@lib/models/course.model';
import {firestore} from 'firebase.app';
import {collectionData} from 'rxfire/firestore';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {courseDetail} from '@lib/data-adapters/courses.adapter';


@Injectable({
  providedIn: 'root'
})

export class CourseService {

  get courseCollection() {
    return this.courseCollectionListener.asObservable();
  }

  get course() {
    return this.courseListener.asObservable();
  }

  private courseCollectionListener = new BehaviorSubject<any>(null);

  private courseListener = new BehaviorSubject<CourseDetail | null>(null);

  getCourse = courseDetail;

  fetchCourseCollection(faculty_id: string): void {
    const courseRef = firestore.collection(`/semesters/2020_EVEN/courses`).where('faculty_id', '==', faculty_id);

    collectionData(courseRef, 'id').pipe(
      map(e => {
        return e.reduce((collections: any, course: any) => {
          collections[course.batch] = [{name: course.name, courseCode: course.id} as CourseDetail];
          return collections;
        }, {});
      })
    )
      .subscribe((coursesCollection => {
        this.courseCollectionListener.next(coursesCollection);
      }));

  }

}
