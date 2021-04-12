import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/auth';
import {USE_EMULATOR as USE_DATABASE_EMULATOR} from '@angular/fire/database';
import {USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/firestore';
import {USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/functions';

@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  exports: [
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    // ... Existing Providers
    {provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['localhost', 9099] : undefined},
    {provide: USE_DATABASE_EMULATOR, useValue: !environment.production ? ['localhost', 9000] : undefined},
    {provide: USE_FIRESTORE_EMULATOR, useValue: !environment.production ? ['localhost', 8080] : undefined},
    {provide: USE_FUNCTIONS_EMULATOR, useValue: !environment.production ? ['localhost', 5001] : undefined},
  ]
})
export class FirebaseModule {
}
