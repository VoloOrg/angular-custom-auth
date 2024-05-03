import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { AppActions } from '../../store/actions/app.actions';

export const AuthResolver: ResolveFn<void> = () => {
  const store = inject(Store);
  debugger;
  return store.pipe(
    take(1),
    tap(() => {
      store.dispatch(AppActions.getCurrentUser()); // Dispatch action to get current user
    })
  );
};
