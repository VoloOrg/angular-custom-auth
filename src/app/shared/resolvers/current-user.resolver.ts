import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, of, race } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthAccountActions } from '../../store/actions/auth-account.actions';
import { User } from '../interfaces';

export const CurrentUserResolver: ResolveFn<Observable<User | null>> = () => {
  const store = inject(Store);
  const actions = inject(Actions);
  store.dispatch(AuthAccountActions.getCurrentUser());
  return race(
    actions.pipe(ofType(AuthAccountActions.getCurrentUserSuccess)),
    actions.pipe(ofType(AuthAccountActions.getCurrentUserError))
  ).pipe(
    map((action) => {
      if (action.type === AuthAccountActions.getCurrentUserSuccess.type) {
        return action.data;
      }
      return null;
    })
  );
};
