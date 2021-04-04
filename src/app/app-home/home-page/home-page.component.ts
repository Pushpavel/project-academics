import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '@service/course.service';
import { UserService } from '@service/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private courseService: CourseService, private userService: UserService) { }

  courseCollections?: any = null

  //dummy
  homeTabs: String[] = ["Tab1", "Tab2", "Tab3", "Tab4", "Tab5"]

  tabIndex: number = 0

  private courseSubscription!: Subscription
  private userSubscription!: Subscription


  getCourseCollections() {
  }

  authValid(user: any) {
    console.log("from home : ", user);
  }

  ngOnInit(): void {
    this.courseSubscription = this.courseService.courseCollection.subscribe((result) => this.courseCollections = result)
    this.courseService.fetchCourseCollection("Carmela.Konopelski67@nitpy.ac.in")
    this.userSubscription = this.userService.user.subscribe(u => {
      this.authValid(u)
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

  handleArchive() {
    console.log("archive", this.tabIndex);
  }


}
