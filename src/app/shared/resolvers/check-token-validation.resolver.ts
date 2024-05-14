import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { AuthConnectActions } from '../../store/actions/auth-connect.actions';

export const CheckTokenValidationResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot
) => {
  const store = inject(Store);
  const data = {
    email: route.queryParams['email'],
    token: route.queryParams['token'],
    type: route.queryParams['type'],
  };
  return store.pipe(
    take(1),
    tap(() => {
      store.dispatch(AuthConnectActions.checkTokenValidation({ data }));
    })
  );
};
