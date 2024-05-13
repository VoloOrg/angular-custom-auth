import { Routes } from '@angular/router';
import {
  ChangePasswordComponent,
  DashboardComponent,
  InviteUserComponent,
} from './components';
import { canInviteGuard } from '../shared/guards';

const PrivateComponentLoader = () =>
  import('./private.component').then((c) => c.PrivateComponent);

export const privateRoutes: Routes = [
  {
    path: '',
    loadComponent: PrivateComponentLoader,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'change-password', component: ChangePasswordComponent },
      {
        path: 'invite-user',
        component: InviteUserComponent,
        canActivate: [canInviteGuard],
      },
    ],
  },
];
