import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { MdcHelperModule } from "../mdc-helper/mdc-helper.module";
@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    MdcHelperModule
  ]
})
export class AuthModule { }
