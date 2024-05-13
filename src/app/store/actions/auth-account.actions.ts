import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChangePassword, User } from '../../shared/interfaces';
import { httpErrorProps, httpSuccessProps } from '../../shared/functions';

/**
 * @ignore
 */
export const AuthAccountActions = createActionGroup({
  source: '[AuthAccount]',
  events: {
    Logout: emptyProps(),
    'Logout Success': httpSuccessProps<boolean>(),
    'Logout Error': httpErrorProps(),

    'Change Password': props<{ data: ChangePassword }>(),
    'Change Password Success': httpSuccessProps<boolean>(),
    'Change Password Error': httpErrorProps(),

    'Get Current User': emptyProps(),
    'Get Current User Success': httpSuccessProps<User>(),
    'Get Current User Error': httpErrorProps(),
  },
});
