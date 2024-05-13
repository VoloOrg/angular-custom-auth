import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from '../features.enum';
import { initialAuthConnectState } from '../states/auth-connect.state';
import { AuthConnectActions } from '../actions/auth-connect.actions';

export const authConnectReducer = createReducer(
  initialAuthConnectState,
  immerOn(AuthConnectActions.login, (state) => {
    state.loginLoading = true;
  }),
  immerOn(AuthConnectActions.loginSuccess, (state) => {
    localStorage.setItem('isAuth', 'true');
  }),
  immerOn(
    AuthConnectActions.loginSuccess,
    AuthConnectActions.loginError,
    (state) => {
      state.loginLoading = false;
    }
  ),

  immerOn(AuthConnectActions.forgotPassword, (state) => {
    state.forgotPasswordLoading = true;
  }),
  immerOn(
    AuthConnectActions.forgotPasswordSuccess,
    AuthConnectActions.forgotPasswordError,
    (state) => {
      state.forgotPasswordLoading = false;
    }
  ),
  immerOn(AuthConnectActions.register, (state) => {
    state.registerLoading = true;
  }),
  immerOn(
    AuthConnectActions.registerSuccess,
    AuthConnectActions.registerError,
    (state) => {
      state.registerLoading = false;
    }
  )
);

export const authConnectFeature = createFeature({
  name: Features.AuthConnect,
  reducer: authConnectReducer,
});
