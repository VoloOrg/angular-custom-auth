import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authAccountFeature } from '../../store/features';
import { Role } from '../enums/role.enum';

export function canInviteGuard() {
  debugger;
  const store = inject(Store);
  const router = inject(Router);
  const currentUser = store.selectSignal(
    authAccountFeature.selectCurrentUser
  )();
  return currentUser?.role === Role.Admin || router.navigate(['/']);
}
