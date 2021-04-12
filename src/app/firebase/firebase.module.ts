import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/auth';
import {USE_EMULATOR as USE_DATABASE_EMULATOR} from '@angular/fire/database';
import {USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/firestore';
import {AngularFireFunctionsModule, REGION, USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/functions';

@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
  ],
  exports: [
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
  ],
  providers: [
    // ... Existing Providers
    {provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['localhost', 9099] : undefined},
    {provide: USE_DATABASE_EMULATOR, useValue: !environment.production ? ['localhost', 9000] : undefined},
    {provide: USE_FIRESTORE_EMULATOR, useValue: !environment.production ? ['localhost', 8080] : undefined},
    {provide: USE_FUNCTIONS_EMULATOR, useValue: !environment.production ? ['localhost', 5001] : undefined},
    {provide: REGION, useValue: 'asia-south1'}
  ]
})
export class FirebaseModule {
}
