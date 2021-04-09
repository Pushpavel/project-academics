import {Component} from '@angular/core';
import {UserService} from '@service/user.service';
import {PageService} from '@service/page.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {

  //  TODO: find alternative
  userIcon: Record<string, string> = {
    exam_cell: 'account_balance',
    hod: 'account_circle',
    student: 'tag_faces',
    faculty: 'class'
  };

  constructor(public user: UserService, public service: PageService) {
  }

}
