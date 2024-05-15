import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { race } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthAccountActions } from '../../store/actions/auth-account.actions';

export function currentUserGuard() {
  const store = inject(Store);
  const actions = inject(Actions);
  store.dispatch(AuthAccountActions.getCurrentUser());
  return race(
    actions.pipe(ofType(AuthAccountActions.getCurrentUserSuccess)),
    actions.pipe(ofType(AuthAccountActions.getCurrentUserError))
  ).pipe(
    map((action) => {
      if (action.type === AuthAccountActions.getCurrentUserSuccess.type) {
        return true;
      }
      return false;
    })
  );
}
