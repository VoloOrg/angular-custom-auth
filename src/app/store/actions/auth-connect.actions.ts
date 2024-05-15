import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  CheckToken,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
} from '../../shared/interfaces';
import { httpErrorProps, httpSuccessProps } from '../../shared/functions';

/**
 * @ignore
 */
export const AuthConnectActions = createActionGroup({
  source: '[AuthConnect]',
  events: {
    Login: props<{ data: Login }>(),
    'Login Success': emptyProps(),
    'Login Error': httpErrorProps(),

    'Forgot Password': props<{ data: ForgotPassword }>(),
    'Forgot Password Success': httpSuccessProps<boolean>(),
    'Forgot Password Error': httpErrorProps(),

    'Reset Password': props<{ data: ResetPassword }>(),
    'Reset Password Success': httpSuccessProps<boolean>(),
    'Reset Password Error': httpErrorProps(),

    Register: props<{ data: Register }>(),
    'Register Success': httpSuccessProps<boolean>(),
    'Register Error': httpErrorProps(),

    'Check Token Validation': props<{ data: CheckToken }>(),
    'Check Token Validation Success': httpSuccessProps<boolean>(),
    'Check Token Validation Error': httpErrorProps(),
  },
});
