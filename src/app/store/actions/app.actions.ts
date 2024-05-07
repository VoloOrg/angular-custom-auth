import { createActionGroup, emptyProps } from '@ngrx/store';
import { httpErrorProps, httpSuccessProps } from '../../shared/functions';

export const AppActions = createActionGroup({
  source: '[App]',
  events: {
    'Application init': emptyProps(),

    'Get Info': emptyProps(),
    'Get Info Success': emptyProps(),
    'Get Info Error': httpErrorProps(),
  },
});
