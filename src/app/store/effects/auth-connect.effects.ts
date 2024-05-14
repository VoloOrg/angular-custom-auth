import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthConnectService } from '../../shared/services';
import { AuthConnectActions } from '../actions/auth-connect.actions';

export const login$ = createEffect(
  (actions = inject(Actions), service = inject(AuthConnectService)) => {
    return actions.pipe(
      ofType(AuthConnectActions.login),
      switchMap(({ data }) =>
        service.login(data).pipe(
          map(() => AuthConnectActions.loginSuccess()),
          catchError((error) => of(AuthConnectActions.loginError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const forgotPassword$ = createEffect(
  (actions = inject(Actions), service = inject(AuthConnectService)) => {
    return actions.pipe(
      ofType(AuthConnectActions.forgotPassword),
      switchMap(({ data }) =>
        service.forgotPassword(data).pipe(
          map((payload) => AuthConnectActions.forgotPasswordSuccess(payload)),
          catchError((error) =>
            of(AuthConnectActions.forgotPasswordError({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const resetPassword$ = createEffect(
  (actions = inject(Actions), service = inject(AuthConnectService)) => {
    return actions.pipe(
      ofType(AuthConnectActions.resetPassword),
      switchMap(({ data }) =>
        service.resetPassword(data).pipe(
          map((payload) => AuthConnectActions.resetPasswordSuccess(payload)),
          catchError((error) =>
            of(AuthConnectActions.resetPasswordError({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const register$ = createEffect(
  (actions = inject(Actions), service = inject(AuthConnectService)) => {
    return actions.pipe(
      ofType(AuthConnectActions.register),
      switchMap(({ data }) =>
        service.register(data).pipe(
          map((payload) => AuthConnectActions.registerSuccess(payload)),
          catchError((error) => of(AuthConnectActions.registerError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const checkTokenValidation$ = createEffect(
  (actions = inject(Actions), service = inject(AuthConnectService)) => {
    return actions.pipe(
      ofType(AuthConnectActions.checkTokenValidation),
      switchMap(({ data }) =>
        service.checkTokenValidation(data).pipe(
          map((payload) =>
            AuthConnectActions.checkTokenValidationSuccess(payload)
          ),
          catchError((error) =>
            of(AuthConnectActions.checkTokenValidationError({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const checkTokenValidationSuccess$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(AuthConnectActions.checkTokenValidationSuccess),
      tap(({ data }) => {
        if (!data) {
          router.navigate(['/login']);
        }
      })
    );
  },
  { functional: true, dispatch: false }
);

export const redirectToLogin$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(
        AuthConnectActions.forgotPasswordSuccess,
        AuthConnectActions.resetPasswordSuccess
      ),
      tap(() => {
        router.navigate(['/login']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const redirectToDashboard$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(
        AuthConnectActions.loginSuccess,
        AuthConnectActions.registerSuccess
      ),
      tap(() => {
        router.navigate(['/']);
      })
    );
  },
  { functional: true, dispatch: false }
);
