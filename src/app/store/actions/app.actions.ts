import { createActionGroup, emptyProps } from '@ngrx/store';
import { httpErrorProps, httpSuccessProps } from '../../shared/functions';

export const AppActions = createActionGroup({
  source: '[App]',
  events: {
    'Application init': emptyProps(),

    'Get Current User': emptyProps(),
    'Get Current User Success': httpSuccessProps<boolean>(),
    'Get Current User Error': httpErrorProps(),
  },
});
