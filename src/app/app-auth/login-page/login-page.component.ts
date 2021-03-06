import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from "../../../core/user.service"
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  @ViewChild("Input") Input?: ElementRef;

  disableTopBar?: boolean;
  email: string = "";
  validEmail?: boolean;
  nextPage: boolean = false;
  error: string = "";
  emailError: string = "";

  constructor(private auth: UserService, private router: Router) {
    this.disableTopBar = true;
  }

  ngOnInit() {
    this.confirmEmail(this.router.url)
  }

  handleContinue() {
    this.email = this.Input?.nativeElement.value;
    // if (this.validateEmail(this.email)) {
    if (true) {
      this.auth.sendSignInLink(this.email);
      this.nextPage = true;
    } else {
      this.emailError = "Invalid email";
    }
  }

  handleGoBack() {
    this.error = this.emailError = "";
    this.nextPage = false;
  }

  confirmEmail(url: string) {
    this.auth.SignInWithLink(url)
      ?.then((user) => {
        if (user != null) {
          window.location.href = "http://localhost:4200/";
        }
      })
      .catch(e => console.log(e))

  }

  private validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
