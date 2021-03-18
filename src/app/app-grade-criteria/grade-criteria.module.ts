import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeCriteriaPageComponent } from './grade-criteria-page/grade-criteria-page.component';
import { GradeCriteriaTableComponent } from './grade-criteria-table/grade-criteria-table.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [GradeCriteriaPageComponent, GradeCriteriaTableComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
  exports: [GradeCriteriaTableComponent]
})
export class GradeCriteriaModule { }
