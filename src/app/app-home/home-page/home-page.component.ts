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
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private courseService: CourseService, private userService: UserService) { }

  courseCollections?: any = null

  //dummy
  homeTabs: String[] = ["Tab1", "Tab2", "Tab3", "Tab4", "Tab5"]

  tabIndex: number = 0

  private courseSubscription!: Subscription
  private userSubscription!: Subscription
  private user ?: AcademicUser | null

  getCourseCollections() {
  }

  isHodPage() : boolean {
    return this.user?.isHod !== undefined
  }

  authValidate(user: AcademicUser | null) {
    if (user) {
      this.courseService.fetchCourseCollection(user.uid)
    }
    this.user = user
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

  handleArchive() {
    this.userService.signOut(); // Dummy signout
    console.log("archive", this.tabIndex);
  }


}
