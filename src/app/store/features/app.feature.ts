import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from '../features.enum';
import { AppActions } from '../actions/app.actions';
import { initialAppState } from '../states/app.state';
import { AuthActions } from '../actions/auth.actions';

export const appReducer = createReducer(
  initialAppState,
  immerOn(AppActions.applicationInit, (state) => {
    state.initLoading = true;
  }),
  immerOn(AppActions.getInfoSuccess, (state) => {
    state.isAuth = true;
  }),
  immerOn(AppActions.getInfoError, (state) => {
    state.initLoading = false;
    state.isAuth = false;
  }),
  immerOn(AuthActions.loginSuccess, (state) => {
    state.isAuth = true;
  }),
  immerOn(AuthActions.logoutSuccess, (state) => {
    state.isAuth = false;
  }),
  immerOn(AuthActions.registerSuccess, (state) => {
    state.isAuth = true;
  })
);

export const appFeature = createFeature({
  name: Features.App,
  reducer: appReducer,
});
