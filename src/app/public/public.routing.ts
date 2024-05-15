import { Routes } from '@angular/router';
import {
  ForgotPasswordComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
} from './components';
import { CheckTokenValidationResolver } from '../shared/resolvers/check-token.resolver';

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
        canActivate: [CheckTokenValidationResolver],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [CheckTokenValidationResolver],
      },
    ],
  },
];
