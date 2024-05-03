import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';

import { appFeature, authFeature } from './store/features';
import { GlobalEffects } from './store/effects/global.effects';
import * as AuthEffects from './store/effects/auth.effects';
import * as AppEffects from './store/effects/app.effects';
import { BASE_URL } from './shared/api';
import { environment } from '../environments/environment';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionTypeUniqueness: true,
          strictActionWithinNgZone: true,
        },
      }
    ),
    provideState(appFeature),
    provideState(authFeature),
    provideState('router', routerReducer),
    provideEffects([GlobalEffects, AuthEffects, AppEffects]),
    provideRouter(routes),
    provideAnimations(),
    provideRouterStore(),
    provideHttpClient(withInterceptorsFromDi()),

    MessageService,
    {
      provide: BASE_URL,
      useValue: environment.baseUrl,
    },
  ],
};