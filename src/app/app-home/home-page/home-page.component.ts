import { Component, OnInit } from '@angular/core';
import { CourseService } from '@service/course.service';
import {  CourseCollection } from '../../../lib/models/course.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private courseService :  CourseService) {

  }

  courseCollections : CourseCollection[] = []

  getCourseCollections(){
    this.courseCollections =  this.courseService.getCoursesCollections()
  }
    
  ngOnInit(): void {
    this.getCourseCollections()
  }

  handleArchive() {
    console.log("archive"); 
  }


}
