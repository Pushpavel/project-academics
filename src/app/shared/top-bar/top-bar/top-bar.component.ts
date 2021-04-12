import {Component} from '@angular/core';
import {UserService} from '@service/user.service';
import {PageService} from '@service/page.service';
import {ActivatedRoute, Router} from "@angular/router";

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

  openHomePage() {
    this.router.navigate(['']);
  }

  constructor(
    public user: UserService,
    public service: PageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

}
