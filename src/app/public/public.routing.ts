import { Routes } from '@angular/router';
import {
  ForgotPasswordComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
} from './components';

const PublicComponentLoader = () =>
  import('./public.component').then((c) => c.PublicComponent);

export const publicRoutes: Routes = [
  {
    path: '',
    loadComponent: PublicComponentLoader,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];
