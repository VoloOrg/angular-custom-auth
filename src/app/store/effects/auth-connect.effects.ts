import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services';
import { AuthConnectActions } from '../actions/auth-connect.actions';

export const login$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
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
  (actions = inject(Actions), service = inject(AuthService)) => {
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
  (actions = inject(Actions), service = inject(AuthService)) => {
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
  (actions = inject(Actions), service = inject(AuthService)) => {
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

export const checkRegisterToken$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthConnectActions.checkRegisterToken),
      switchMap(({ data }) =>
        service.checkRegisterToken(data).pipe(
          map((payload) =>
            AuthConnectActions.checkRegisterTokeSuccess(payload)
          ),
          catchError((error) =>
            of(AuthConnectActions.checkRegisterTokeError({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const checkResetToken$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthConnectActions.checkResetToken),
      switchMap(({ data }) =>
        service.checkResetToken(data).pipe(
          map((payload) => AuthConnectActions.checkResetTokeSuccess(payload)),
          catchError((error) =>
            of(AuthConnectActions.checkResetTokeError({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const checkResetTokeSuccess$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(AuthConnectActions.checkResetTokeSuccess),
      tap(({ data }) => {
        debugger;
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
