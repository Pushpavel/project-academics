import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course, CourseCollection } from '@lib/models/course.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//todo : implement observer pattern

export class CourseService {


  constructor(private firestore: AngularFirestore) {}
  
  private courseCollectionListener = new BehaviorSubject<CourseCollection[]>([]) 
  //Todo : check whether individual subscription for  courses data

  get courseCollection () {
    return this.courseCollectionListener.asObservable()
  }

  //dummy data
  private title : String = "Courses that You manage"
  private coursesList : Course[] = [ 
    {CourseName : "Computer Networks", courseId : "CS201"},
    {CourseName : "Computer Networks", courseId : "CS201"},
    {CourseName : "data Networks", courseId : "CS201"},
    {CourseName : "Computer Networks", courseId : "CS201"},
  ]

  private batchList : CourseCollection[] = [
    { title : this.title, courses : this.coursesList },
    { title : this.title, courses : this.coursesList },
    { title : this.title, courses : this.coursesList },
  ] 


  //need to include firebase logics

  fetch() : void {
    this.courseCollectionListener.next(this.batchList)
  }
}
