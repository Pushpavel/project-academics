import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course, CourseCollection } from '@lib/models/course.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//todo : implement observer pattern

export class CourseService {

  constructor(private firestore: AngularFirestore,) { }

  title : String = "Courses that You manage"
  coursesList : Course[] = [ 
    {CourseName : "Computer Networks", courseId : "CS201"},
    {CourseName : "Computer Networks", courseId : "CS201"},
    {CourseName : "data Networks", courseId : "CS201"},
    {CourseName : "Computer Networks", courseId : "CS201"},
  ]

  batchList : CourseCollection[] = [
    { title : this.title, courses : this.coursesList },
    { title : this.title, courses : this.coursesList },
    { title : this.title, courses : this.coursesList },
  ] 


  //todo make it more feasible and reactive :}
  getCoursesCollections() : Observable<CourseCollection[]> {
    //dummy simulation
    return of(this.batchList).pipe(delay(5000))
  }
}
