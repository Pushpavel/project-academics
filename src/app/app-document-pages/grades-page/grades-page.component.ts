import {Component} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';

@Component({
  selector: 'app-grades-page',
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.scss'],
  host: {class: 'document-page'}
})
export class GradesPageComponent extends DocumentPage {

}
