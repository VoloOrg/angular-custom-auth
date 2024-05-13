import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from '../features.enum';
import { AppActions } from '../actions/app.actions';
import { initialAppState } from '../states/app.state';
import { AuthConnectActions } from '../actions/auth-connect.actions';
import { AuthAccountActions } from '../actions/auth-account.actions';

export const appReducer = createReducer(
  initialAppState,
  immerOn(AppActions.applicationInit, (state) => {
    const isAuth = localStorage.getItem('isAuth');
    state.isAuth = !!isAuth;
  }),
  immerOn(AuthConnectActions.loginSuccess, (state) => {
    localStorage.setItem('isAuth', 'true');
    state.isAuth = true;
  }),
  immerOn(AuthAccountActions.logout, (state) => {
    localStorage.clear();
    state.isAuth = false;
  })
);

export const appFeature = createFeature({
  name: Features.App,
  reducer: appReducer,
});
