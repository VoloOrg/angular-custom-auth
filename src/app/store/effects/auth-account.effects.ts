import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services';
import { AuthAccountActions } from '../actions/auth-account.actions';

export const Logout$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthAccountActions.logout),
      switchMap(() =>
        service.logout().pipe(
          map((payload) => AuthAccountActions.logoutSuccess(payload)),
          catchError((error) => of(AuthAccountActions.logoutError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const changePassword$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthAccountActions.changePassword),
      switchMap(({ data }) =>
        service.changePassword(data).pipe(
          map((payload) => AuthAccountActions.changePasswordSuccess(payload)),
          catchError((error) =>
            of(AuthAccountActions.changePasswordError({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const getCurrentUser$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthAccountActions.getCurrentUser),
      switchMap(() =>
        service.getCurrentUser().pipe(
          map((payload) => AuthAccountActions.getCurrentUserSuccess(payload)),
          catchError((error) =>
            of(AuthAccountActions.getCurrentUserError({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const redirectToLogin$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(AuthAccountActions.logout),
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
      ofType(AuthAccountActions.changePasswordSuccess),
      tap(() => {
        router.navigate(['/']);
      })
    );
  },
  { functional: true, dispatch: false }
);
