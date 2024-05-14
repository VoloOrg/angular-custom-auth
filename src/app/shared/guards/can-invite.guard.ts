import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../enums/role.enum';

export function canInviteGuard() {
  const router = inject(Router);
  const role = localStorage.getItem('role');
  return Number(role) === Role.Admin || router.navigate(['/']);
}
