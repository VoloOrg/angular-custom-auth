import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from '../features.enum';
import { initialAuthAccountState } from '../states/auth-account.state';
import { AuthAccountActions } from '../actions/auth-account.actions';

export const authAccountReducer = createReducer(
  initialAuthAccountState,
  immerOn(AuthAccountActions.logout, (state) => {
    state.logoutLoading = true;
  }),
  immerOn(
    AuthAccountActions.logoutSuccess,
    AuthAccountActions.logoutError,
    (state) => {
      state.logoutLoading = false;
    }
  ),
  immerOn(AuthAccountActions.getCurrentUserSuccess, (state, payload) => {
    state.currentUser = payload.data;
  })
);

export const authAccountFeature = createFeature({
  name: Features.AuthAccount,
  reducer: authAccountReducer,
});
