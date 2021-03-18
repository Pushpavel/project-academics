import { Injectable } from '@angular/core';
import { Course } from '@lib/models/course.model';
import { firestore } from 'firebase.app';
import { collectionData, docData } from 'rxfire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class CourseService {


  constructor() { }

  private courseCollectionListener = new BehaviorSubject<any>(null)

  private courseListener = new BehaviorSubject<Course | null>(null)

  get courseCollection() {
    return this.courseCollectionListener.asObservable()
  }

  get course() {
    return this.courseListener.asObservable()
  }

  fetchCourseCollection(faculty_id: string): void {
    const courseRef = firestore.collection(`/semesters/2020_EVEN/courses`).where("faculty_id", "==", faculty_id)

    collectionData(courseRef, 'id').pipe(
      map(e => {
        return e.reduce((collections: any, course: any) => {
          collections[course.batch] = [{ CourseName: course.name, courseId: course.id } as Course]
          return collections
        },{})
      })
    )
      .subscribe((coursesCollection => {
        this.courseCollectionListener.next(coursesCollection)
      }))

  }

  fetchCourse(courseId: string): void {
    const courseRef = firestore.doc(`/semesters/2020_EVEN/courses/${courseId}`)
    docData(courseRef).subscribe(courseData => {
      console.log(courseData);
    })
  }

}
