import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../shared/services';
import { AppActions } from '../actions/app.actions';

export const appInit$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
    return actions.pipe(
      ofType(AppActions.applicationInit, AppActions.getInfo),
      switchMap(() =>
        service.getInfo().pipe(
          map(() => AppActions.getInfoSuccess()),
          catchError((error) => of(AppActions.getInfoError({ error })))
        )
      )
    );
  },
  { functional: true }
);
