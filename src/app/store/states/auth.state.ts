export type AuthState = {
  loginLoading: boolean;
  logoutLoading: boolean;
  registerLoading: boolean;
  forgotPasswordLoading: boolean;
};

/** General App initial State */
export const initialAuthState: AuthState = {
  loginLoading: false,
  logoutLoading: false,
  registerLoading: false,
  forgotPasswordLoading: false,
};
