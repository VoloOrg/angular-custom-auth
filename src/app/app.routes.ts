import { Routes } from '@angular/router';
import { authGuard, notAuthGuard } from './shared/guards';
import { CurrentUserResolver } from './shared/resolvers/current-user.resolver';

const PublicRoutingLoader = () =>
  import('./public/public.routing').then((m) => m.publicRoutes);

const PrivateRoutingLoader = () =>
  import('./private/private.routing').then((m) => m.privateRoutes);

export const routes: Routes = [
  {
    path: '',
    loadChildren: PrivateRoutingLoader,
    canActivate: [authGuard, CurrentUserResolver],
  },
  {
    path: '',
    loadChildren: PublicRoutingLoader,
    canActivate: [notAuthGuard],
  },
];
