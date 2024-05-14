import { Routes } from '@angular/router';
import {
  ForgotPasswordComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
} from './components';
import { CheckTokenValidationResolver } from '../shared/resolvers';

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
        resolve: {
          canReset: CheckTokenValidationResolver,
        },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
        resolve: {
          canRegister: CheckTokenValidationResolver,
        },
      },
    ],
  },
];
