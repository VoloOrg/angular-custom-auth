import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { AuthAccountActions } from '../../store/actions/auth-account.actions';

export const CurrentUserResolver: ResolveFn<void> = () => {
  const store = inject(Store);
  return store.pipe(
    take(1),
    tap(() => {
      store.dispatch(AuthAccountActions.getCurrentUser()); // Dispatch action to get current user
    })
  );
};
