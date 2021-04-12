import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcademicUser } from '@lib/models/user.model';
import { CourseService } from '@service/course.service';
import { UserService } from '@service/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

/**
 * Faculty
 * Student
 * Exam cell
 * Hod
 * 
 * TODO : make tabs feasible
 * 
 */
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private courseService: CourseService, private userService: UserService) { }

  courseCollections?: any = null

  //dummy
  homeTabs: String[] = ["Tab1", "Tab2", "Tab3", "Tab4", "Tab5"]

  tabIndex: number = 0

  private courseSubscription!: Subscription
  private userSubscription!: Subscription
  user?: AcademicUser | null

  getCourseCollections() {
  }

  authValidate(user: AcademicUser | null) {

    this.user = user

    if (user?.isFaculty) {
      this.courseService.fetchCoursesForFaculty(user.uid, '2020_EVEN')
    }

    if (user?.isHod) {
      //fetch hod courses
    }

    if (user?.isStudent) {  
      //TODO: student filter params
      this.courseService.fetchCoursesForStudent('19B1', '2020_EVEN')
    }

    if (user?.isExamCell) {
      //exam cell (all)
    }

  }

  ngOnInit(): void {
    this.courseSubscription = this.courseService.courseCollection.subscribe((result) => this.courseCollections = result)
    this.userSubscription = this.userService.subscribe(u => {
      this.authValidate(u)
    })
  }

  ngOnDestroy(): void {
    if (this.userSubscription)
      this.courseSubscription.unsubscribe()
    if (this.userSubscription)
      this.userSubscription.unsubscribe()
  }

  handletabChange(i: any) {
    this.tabIndex = i
  }


  handleResultSummary(){
    console.log("result summary", this.tabIndex);
  }

  handleResult(){
    console.log("Result", this.tabIndex);
  }

  handleArchive() {
    console.log("archive", this.tabIndex);
  }


}
