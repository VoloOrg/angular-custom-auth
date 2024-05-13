export type AuthConnectState = {
  loginLoading: boolean;
  forgotPasswordLoading: boolean;
  registerLoading: boolean;
};

/** General App initial State */
export const initialAuthConnectState: AuthConnectState = {
  loginLoading: false,
  forgotPasswordLoading: false,
  registerLoading: false,
};
