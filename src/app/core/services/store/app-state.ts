import { initialUserState, IUserState } from './user-store/state/user-state';

export interface AppState {
  userState: IUserState;
}

export const initialAppState: AppState = {
  userState: initialUserState,
};
