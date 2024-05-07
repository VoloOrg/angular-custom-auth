import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { appFeature } from '../../store/features/app.feature';

export function authGuard() {
  const store = inject(Store);
  const router = inject(Router);
  const isAuth = store.selectSignal(appFeature.selectIsAuth)();
  return isAuth || router.navigate(['/login']);
}
