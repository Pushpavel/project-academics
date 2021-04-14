import {Injectable} from '@angular/core';
import {CourseDetailRaw, CourseRaw} from '@models/course.model';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {CourseSources} from 'lib/data/source/course.sources';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore/collection/collection';


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

  getCourseDetail = this.source.courseDetail.bind(this.source);

  getCourse = this.source.course.bind(this.source);

  //TODO : need to initialise for current sem
  //TODO : Hod student exam cell fetch

  fetchCoursesForFaculty(faculty_id: string, sem_id: string): void {
    const courseRef = this.afs.collection<CourseRaw>(`/semesters/${sem_id}/courses`, q => q.where('facultyId', '==', faculty_id));
    this.fetchCoursesGeneral(courseRef, 'courses that you manage');
  }

  fetchCoursesForStudent(batch: string, sem_id: string) {
    const courseRef = this.afs.collection<CourseRaw>(`/semesters/${sem_id}/courses`, q => q.where('batch', '==', batch));
    this.fetchCoursesGeneral(courseRef, 'Courses');
  }

  fetchCoursesGeneral(courseRef: AngularFirestoreCollection<CourseRaw>, key: string) {
    courseRef.valueChanges({idField: 'id'}).pipe(
      map(e => {
        return e.reduce((collections: any, course: any) => {
          collections[key] = [{name: course.name, courseCode: course.id} as CourseDetailRaw];
          return collections;
        }, {});
      })
    )
      .subscribe((coursesCollection => {
        this.courseCollectionListener.next(coursesCollection);
      }));
  }

  constructor(private source: CourseSources, private afs: AngularFirestore) {
  }

}
