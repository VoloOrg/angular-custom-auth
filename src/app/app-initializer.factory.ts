import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from './store/actions/app.actions';

export function appInitializer() {
  const store = inject(Store);
  store.dispatch(AppActions.applicationInit());
}
