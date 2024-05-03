import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChangePassword, ForgotPassword, Login } from '../../shared/interfaces';
import { httpErrorProps, httpSuccessProps } from '../../shared/functions';

/**
 * @ignore
 */
export const AuthActions = createActionGroup({
  source: '[Auth]',
  events: {
    Login: props<{ data: Login }>(),
    'Login Success': httpSuccessProps<boolean>(),
    'Login Error': httpErrorProps(),

    Logout: emptyProps(),
    'Logout Success': httpSuccessProps<boolean>(),
    'Logout Error': httpErrorProps(),

    Register: props<{ data: Login }>(),
    'Register Success': httpSuccessProps<boolean>(),
    'Register Error': httpErrorProps(),

    'Forgot Password': props<{ data: ForgotPassword }>(),
    'Forgot Password Success': httpSuccessProps<boolean>(),
    'Forgot Password Error': httpErrorProps(),

    'Change Password': props<{ data: ChangePassword }>(),
    'Change Password Success': httpSuccessProps<boolean>(),
    'Change Password Error': httpErrorProps(),
  },
});
