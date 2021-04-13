import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {USE_EMULATOR as USE_DATABASE_EMULATOR} from '@angular/fire/database';
import {USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/firestore';
import {AngularFireFunctionsModule, REGION, USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/functions';

@NgModule({
  declarations: [],
  imports: [
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
  ],
  exports: [
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
  ],
  providers: [
    {provide: USE_DATABASE_EMULATOR, useValue: !environment.production ? ['localhost', 9000] : undefined},
    {provide: USE_FIRESTORE_EMULATOR, useValue: !environment.production ? ['localhost', 8080] : undefined},
    {provide: USE_FUNCTIONS_EMULATOR, useValue: !environment.production ? ['localhost', 5001] : undefined},
    {provide: REGION, useValue: 'asia-south1'}
  ]
})
export class FirebaseModule {
}
