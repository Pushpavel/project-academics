import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {initialize as initializeFirebaseApp} from './environments/initialize';
import {FIREBASE_OPTIONS} from '@angular/fire';

if (environment.production)
  enableProdMode();

// see issue https://github.com/angular/angularfire/issues/2656
initializeFirebaseApp(environment.FIREBASE_CONFIG);

platformBrowserDynamic([{
  provide: FIREBASE_OPTIONS,
  useValue: environment.FIREBASE_CONFIG,
}]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
