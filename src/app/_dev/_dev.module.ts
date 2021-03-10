/* tslint:disable:class-name */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevPageComponent } from './dev-page/dev-page.component';
import {MatSliderModule} from '@angular/material/slider';



@NgModule({
  declarations: [DevPageComponent],
  imports: [
    CommonModule,
    MatSliderModule
  ],
})
export class _DevModule { }
