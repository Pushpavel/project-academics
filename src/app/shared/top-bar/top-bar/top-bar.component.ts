import {Component, Input} from '@angular/core';
import {UserService} from '@service/user.service';
import {Router} from '@angular/router';

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

  @Input() title?: string;

  openHomePage() {
    this.router.navigate(['']);
  }

  constructor(
    public user: UserService,
    private router: Router
  ) {
  }

}
