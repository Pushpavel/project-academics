import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '@service/course.service';
import { CourseCollection } from '@lib/models/course.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private courseService: CourseService) {  }

  courseCollections: CourseCollection[] = []

  private courseSubscription!: Subscription  ;

  getCourseCollections() {
  }

  ngOnInit(): void {
     this.courseSubscription = this.courseService.courseCollection.subscribe((result) => this.courseCollections = result)
     this.courseService.fetch()
  }

  ngOnDestroy() : void {
    this.courseSubscription.unsubscribe()
  }

  handleArchive() {
    console.log("archive");
  }


}
