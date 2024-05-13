import { Routes } from '@angular/router';
import { authGuard, notAuthGuard } from './shared/guards';
import { CurrentUserResolver } from './shared/resolvers/private.resolver';

const PublicRoutingLoader = () =>
  import('./public/public.routing').then((m) => m.publicRoutes);

const PrivateRoutingLoader = () =>
  import('./private/private.routing').then((m) => m.privateRoutes);

export const routes: Routes = [
  {
    path: '',
    loadChildren: PrivateRoutingLoader,
    canActivate: [authGuard],
    resolve: {
      currentUser: CurrentUserResolver,
    },
  },
  {
    path: '',
    loadChildren: PublicRoutingLoader,
    canActivate: [notAuthGuard],
  },
];
