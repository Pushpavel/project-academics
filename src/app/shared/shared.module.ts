import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopBarComponent} from './top-bar/top-bar.component';
import {DataCardComponent} from './data-card/data-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [TopBarComponent, DataCardComponent],
  exports: [
    TopBarComponent,
    DataCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class SharedModule {
}
