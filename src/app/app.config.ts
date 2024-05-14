import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { UrlSerializer, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';

import {
  appFeature,
  authAccountFeature,
  authConnectFeature,
} from './store/features';
import { GlobalEffects } from './store/effects/global.effects';
import * as AuthAccountEffects from './store/effects/auth-account.effects';
import * as AuthConnectEffects from './store/effects/auth-connect.effects';
import { BASE_URL } from './shared/api';
import { environment } from '../environments/environment';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { appInitializer } from './app-initializer.factory';
import CustomUrlSerializer from './shared/serializers/custom-url.serializer';
import { HttpRequestInterceptor } from './shared/interceptors/http-request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
    },
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
    provideState(authConnectFeature),
    provideState(authAccountFeature),
    provideState('router', routerReducer),
    provideEffects([GlobalEffects, AuthAccountEffects, AuthConnectEffects]),
    provideRouter(routes),
    provideAnimations(),
    provideRouterStore(),
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    {
      provide: BASE_URL,
      useValue: environment.baseUrl,
    },
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
};
