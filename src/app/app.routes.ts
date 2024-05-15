import { Routes } from '@angular/router';
import { authGuard, currentUserGuard, notAuthGuard } from './shared/guards';

const PublicRoutingLoader = () =>
  import('./public/public.routing').then((m) => m.publicRoutes);

const PrivateRoutingLoader = () =>
  import('./private/private.routing').then((m) => m.privateRoutes);

export const routes: Routes = [
  {
    path: '',
    loadChildren: PrivateRoutingLoader,
    canActivate: [authGuard, currentUserGuard],
  },
  {
    path: '',
    loadChildren: PublicRoutingLoader,
    canActivate: [notAuthGuard],
  },
];
