import {Injectable} from '@angular/core';
import {StudentsSources} from '../lib/data/source/students.sources';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  getStudentEntries = this.sources.publicStudentEntries.bind(this.sources);

  constructor(private sources: StudentsSources) {
  }
}
