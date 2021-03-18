import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '@service/course.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private courseService: CourseService) {  }

  courseCollections ?: any = null

  private courseSubscription!: Subscription  

  getCourseCollections() {
  }

  ngOnInit(): void {
     this.courseSubscription = this.courseService.courseCollection.subscribe((result) => this.courseCollections = result )
     this.courseService.fetchCourseCollection("Carmela.Konopelski67@nitpy.ac.in")
  }

  ngOnDestroy() : void {
    this.courseSubscription.unsubscribe()
  }

  handleArchive() {
    console.log("archive");
  }


}
