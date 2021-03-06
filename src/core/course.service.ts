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

  /**
   * @deprecated
   */
  get courseCollection() {
    return this.courseCollectionListener.asObservable();
  }

  /**
   * @deprecated
   */
  get course() {
    return this.courseListener.asObservable();
  }


  /**
   * @deprecated
   */
  private courseCollectionListener = new BehaviorSubject<any>(null);


  /**
   * @deprecated
   */
  private courseListener = new BehaviorSubject<CourseDetailRaw | null>(null);


  getCourseDetail = this.source.courseDetail.bind(this.source);

  getCourse = this.source.course.bind(this.source);

  getCourses = this.source.courses.bind(this.source);

  /**
   * @deprecated
   */
  fetchCoursesForFaculty(faculty_id: string, sem_id: string): void {
    const courseRef = this.afs.collection<CourseRaw>(`/semesters/${sem_id}/courses`, q => q.where('facultyId', '==', faculty_id));
    this.fetchCoursesGeneral(courseRef, 'courses that you manage');
  }

  /**
   * @deprecated
   */
  fetchCoursesForStudent(batch: string, sem_id: string) {
    const courseRef = this.afs.collection<CourseRaw>(`/semesters/${sem_id}/courses`, q => q.where('batch', '==', batch));
    this.fetchCoursesGeneral(courseRef, 'Courses');
  }

  /**
   * @deprecated
   */
  fetchCoursesGeneral(courseRef: AngularFirestoreCollection<CourseRaw>, key: string) {
    courseRef.valueChanges({idField: 'id'}).pipe(
      map(e => {
        //Really janky implementation. Can break for sure
        //TODO: Refactor the implementation
        let tmp: any = {};
        tmp[key] = e.map(el => {
          return {name: el.name, courseCode: el.id} as CourseDetailRaw;
        });
        return tmp;
      })
    )
      .subscribe((coursesCollection => {
        this.courseCollectionListener.next(coursesCollection);
      }));
  }


  constructor(private source: CourseSources, private afs: AngularFirestore) {
  }

}
