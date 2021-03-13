import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course, CourseCollection } from '@lib/models/course.model';

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


  getCoursesCollections() : any {
    return this.batchList
  }
}
