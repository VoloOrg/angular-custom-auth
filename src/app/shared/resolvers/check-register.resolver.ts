import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { AuthConnectActions } from '../../store/actions/auth-connect.actions';

export const CheckRegisterResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot
) => {
  const store = inject(Store);
  const data = {
    email: route.queryParams['email'],
    token: route.queryParams['token'],
  };
  return store.pipe(
    take(1),
    tap(() => {
      store.dispatch(AuthConnectActions.checkRegisterToken({ data }));
    })
  );
};
