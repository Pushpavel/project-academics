import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageLayout } from "../../shared/helpers/PageLayout";
import { PageService } from "../../../core/page.service";
import { UserService } from "../../../core/user.service"
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends PageLayout {

  @ViewChild("Input") Input?: ElementRef;

  disableTopBar?: boolean;
  email: string = "";
  password: string = "";
  validEmail?: boolean;
  nextPage: boolean = false;

  constructor(page: PageService, private auth: UserService, private router: Router) {
    super(page);
    this.disableTopBar = true;
  }

  ngOnInit() {
    this.confirmEmail(this.router.url)
  }

  handleContinue(event: any) {
    this.email = this.Input?.nativeElement.value;
    if (this.validateEmail(this.email)) {
      this.nextPage = true;
      this.auth.sendSignInLink(this.email);
    } else {
      console.log("Invalid email")
    }
  }

  handleGoBack() {
    this.nextPage = false;
  }

  handleLogin(event: any) {
    this.password = this.Input?.nativeElement.value;
    console.log(this.email, this.password);
  }

  confirmEmail(url: string) {
    this.auth.SignInWithLink(url)
      ?.then((user) => {
        if (user != null) {
          this.router.navigateByUrl("http://localhost:4200/sem/2020_EVEN/home");
        }
      })
      .catch(e => console.log(e))

  }

  private validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
