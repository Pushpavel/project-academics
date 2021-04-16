import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcademicUser } from '@models/user.model';
import { CourseService } from 'core/course.service';
import { UserService } from 'core/user.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

/**
 * [\] Faculty
 * [\] Student - Redirect is remaining
 * [] Exam cell
 * [] Hod
 *
 * TODO : make tabs feasible
 *
 */

export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private courseService: CourseService, private userService: UserService) { }

  courseCollections?: any = null
  title = ""
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
      this.courseService.fetchCoursesForFaculty(user.uid, '2020_2')
    }

    if (user?.isHod) {
      //fetch hod courses
    }

    if (user?.isStudent) {
      //TODO: student filter params
      this.courseService.fetchCoursesForStudent('19B1', '2020_2')
    }

    if (user?.isExamCell) {
      //exam cell (all)
    }

  }

  ngOnInit(): void {
    this.courseSubscription = this.courseService.courseCollection.subscribe((result) => { if (result) this.initData(result) })
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

  initData(result: any) {
    this.courseCollections = result;
    console.log(result);
    this.title = Object.keys(result)[0];
  }

  handletabChange(i: any) {
    this.tabIndex = i
  }


  handleResultSummary() {
    console.log("result summary", this.tabIndex);
  }

  handleResult() {
    console.log("Result", this.tabIndex);
  }

  handleArchive() {
    //this.userService.signOut(); // Dummy signout
    console.log("archive", this.tabIndex);
  }


}
