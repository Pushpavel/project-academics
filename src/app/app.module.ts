import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {_DevModule} from './_dev/_dev.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {REGION} from '@angular/fire/functions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    _DevModule
  ],
  providers: [{provide: REGION, useValue: 'asia-south1'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
