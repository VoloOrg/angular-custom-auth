import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services';
import { AuthActions } from '../actions/auth.actions';

export const login$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthActions.login),
      switchMap(({ data }) =>
        service.login(data).pipe(
          map(() => AuthActions.loginSuccess()),
          catchError((error) => of(AuthActions.loginError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const loginSuccess$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        router.navigate(['/']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const Logout$ = createEffect(
  (
    actions = inject(Actions),
    service = inject(AuthService),
    router = inject(Router)
  ) => {
    return actions.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        service.logout().pipe(
          map((payload) => {
            router.navigate(['/login']);
            return AuthActions.logoutSuccess(payload);
          }),
          catchError((error) => of(AuthActions.logoutError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const register$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthActions.register),
      switchMap(({ data }) =>
        service.register(data).pipe(
          map((payload) => AuthActions.registerSuccess(payload)),
          catchError((error) => of(AuthActions.registerError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const forgotPassword$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthActions.forgotPassword),
      switchMap(({ data }) =>
        service.forgotPassword(data).pipe(
          map((payload) => AuthActions.forgotPasswordSuccess(payload)),
          catchError((error) => of(AuthActions.forgotPasswordError({ error })))
        )
      )
    );
  },
  { functional: true }
);
