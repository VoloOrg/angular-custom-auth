import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from '../features.enum';
import { initialAuthState } from '../states/auth.state';
import { AuthActions } from '../actions/auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  immerOn(AuthActions.login, (state) => {
    state.loginLoading = true;
  }),
  immerOn(AuthActions.loginSuccess, AuthActions.loginError, (state) => {
    state.loginLoading = false;
  }),
  immerOn(AuthActions.logout, (state) => {
    state.logoutLoading = true;
  }),
  immerOn(AuthActions.logoutSuccess, AuthActions.logoutError, (state) => {
    state.logoutLoading = false;
  }),
  immerOn(AuthActions.register, (state) => {
    state.registerLoading = true;
  }),
  immerOn(AuthActions.registerSuccess, AuthActions.registerError, (state) => {
    state.registerLoading = false;
  }),
  immerOn(AuthActions.forgotPassword, (state) => {
    state.forgotPasswordLoading = true;
  }),
  immerOn(
    AuthActions.forgotPasswordSuccess,
    AuthActions.forgotPasswordError,
    (state) => {
      state.forgotPasswordLoading = false;
    }
  )
);

export const authFeature = createFeature({
  name: Features.Auth,
  reducer: authReducer,
});
