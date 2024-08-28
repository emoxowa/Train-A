import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app-state';
import { userReducer } from './user-store/reducers/user.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  userState: userReducer,
};
