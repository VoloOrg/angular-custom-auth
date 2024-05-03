import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { appFeature } from '../../store/features';

export function notAuthGuard() {
  const store = inject(Store);
  const router = inject(Router);
  const isAuth = store.selectSignal(appFeature.selectIsAuth)();
  if (isAuth) {
    router.navigate(['/']);
  }
  return !isAuth;
}
