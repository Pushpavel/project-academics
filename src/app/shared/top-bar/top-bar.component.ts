import {Component, OnInit} from '@angular/core';
import {UserService} from '@service/user.service';
import {AcademicUser} from '@lib/models/user.model';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  userIcon: Record<AcademicUser['role'], string> = {
    'exam-cell': 'account_balance',
    hod: 'account_circle',
    student: 'tag_faces',
    faculty: 'class'
  };

  constructor(public user: UserService) {
  }

  ngOnInit(): void {
  }

}
