import { Routes } from '@angular/router';
import {
  ForgotPasswordComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
} from './components';
import { CheckTokenGuard } from '../shared/guards/check-token.guard';

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
        canActivate: [CheckTokenGuard],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [CheckTokenGuard],
      },
    ],
  },
];
