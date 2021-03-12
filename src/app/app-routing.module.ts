import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DevPageComponent} from './_dev/dev-page/dev-page.component';
import {environment} from '../environments/environment';
import { HomePageComponent } from './app-home/home-page/home-page.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent}
];


if (!environment.production) routes.push({path: 'dev', component: DevPageComponent});


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
