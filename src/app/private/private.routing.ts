import { Routes } from '@angular/router';
import { ChangePasswordComponent, DashboardComponent } from './components';

const PrivateComponentLoader = () =>
  import('./private.component').then((c) => c.PrivateComponent);

export const privateRoutes: Routes = [
  {
    path: '',
    loadComponent: PrivateComponentLoader,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'change-password', component: ChangePasswordComponent },
    ],
    providers: [],
  },
];
