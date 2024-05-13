import { User } from '../../shared/interfaces';

export type AuthAccountState = {
  logoutLoading: boolean;
  currentUser: User | null;
};

/** General App initial State */
export const initialAuthAccountState: AuthAccountState = {
  logoutLoading: false,
  currentUser: null,
};
