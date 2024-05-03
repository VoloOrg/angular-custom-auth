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
  immerOn(AppActions.getCurrentUserSuccess, (state, payload) => {
    debugger;
    state.initLoading = false;
    if (payload.data) {
      state.isAuth = true;
      localStorage.setItem('isAuth', 'true');
    } else {
      state.isAuth = false;
      localStorage.clear();
    }
  }),
  immerOn(AppActions.getCurrentUserError, (state) => {
    debugger;
    state.initLoading = false;
  }),
  immerOn(AuthActions.loginSuccess, (state) => {
    state.isAuth = true;
    localStorage.setItem('isAuth', 'true');
  }),
  immerOn(AuthActions.logoutSuccess, (state) => {
    state.isAuth = false;
    localStorage.clear();
  }),
  immerOn(AuthActions.registerSuccess, (state) => {
    localStorage.setItem('isAuth', 'true');
    state.isAuth = true;
  })
);

export const appFeature = createFeature({
  name: Features.App,
  reducer: appReducer,
});
