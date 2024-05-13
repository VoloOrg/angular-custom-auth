import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  CheckToken,
  ForgotPassword,
  Login,
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

    Register: props<{ data: Login }>(),
    'Register Success': httpSuccessProps<boolean>(),
    'Register Error': httpErrorProps(),

    'Check Reset Token': props<{ data: CheckToken }>(),
    'Check Reset Toke Success': httpSuccessProps<boolean>(),
    'Check Reset Toke Error': httpErrorProps(),

    'Check Register Token': props<{ data: CheckToken }>(),
    'Check Register Toke Success': httpSuccessProps<boolean>(),
    'Check Register Toke Error': httpErrorProps(),
  },
});
