import {Injectable} from '@angular/core';
import {CourseDetailRaw} from '@lib/models/document/course.model';
import {firestore} from 'firebase.app';
import {collectionData} from 'rxfire/firestore';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {course, courseDetail} from '@lib/data-adapters/courses.adapter';


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

  private courseListener = new BehaviorSubject<CourseDetailRaw | null>(null);

  getCourseDetail = courseDetail;

  getCourse = course;

  fetchCourseCollection(faculty_id: string): void {
    const courseRef = firestore.collection(`/semesters/2020_EVEN/courses`).where('faculty_id', '==', faculty_id);

    collectionData(courseRef, 'id').pipe(
      map(e => {
        return e.reduce((collections: any, course: any) => {
          collections[course.batch] = [{name: course.name, courseCode: course.id} as CourseDetailRaw];
          return collections;
        }, {});
      })
    )
      .subscribe((coursesCollection => {
        this.courseCollectionListener.next(coursesCollection);
      }));

  }

}
