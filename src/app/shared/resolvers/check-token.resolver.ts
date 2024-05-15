import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, race } from 'rxjs';
import { AuthConnectActions } from '../../store/actions/auth-connect.actions';
import { Actions, ofType } from '@ngrx/effects';

export function CheckTokenValidationResolver(route: ActivatedRouteSnapshot) {
  debugger;
  const store = inject(Store);
  const actions = inject(Actions);
  const data = {
    email: route.queryParams['email'],
    token: route.queryParams['token'],
    type: route.queryParams['type'],
  };
  store.dispatch(AuthConnectActions.checkTokenValidation({ data }));
  return race(
    actions.pipe(ofType(AuthConnectActions.checkTokenValidationSuccess)),
    actions.pipe(ofType(AuthConnectActions.checkTokenValidationError))
  ).pipe(
    map((action) => {
      if (action.type === AuthConnectActions.checkTokenValidationSuccess.type) {
        if (action.data) {
          return true;
        }
        return false;
      }
      return false;
    })
  );
}
