import { Routes } from '@angular/router';
import { authGuard, notAuthGuard } from './shared/guards';
import { AuthResolver } from './shared/resolvers/auth.resolver';

const PublicRoutingLoader = () =>
  import('./public/public.routing').then((m) => m.publicRoutes);

const PrivateRoutingLoader = () =>
  import('./private/private.routing').then((m) => m.privateRoutes);

export const routes: Routes = [
  {
    path: '',
    loadChildren: PrivateRoutingLoader,
    canActivate: [authGuard],
    resolve: { auth: AuthResolver },
  },
  {
    path: '',
    loadChildren: PublicRoutingLoader,
    canActivate: [notAuthGuard],
  },
];
