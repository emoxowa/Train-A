import { createSelector } from '@ngrx/store';
import { IUser } from '@app/train/models/user.model';
import { IUserState } from '@core/store/user-store/state/user-state';
import { AppState } from '../../app-state';

export const selectUserState = (state: AppState) => state.userState;

export const selectUser = createSelector(selectUserState, (userState: IUserState) => userState.user);

export const selectUserName = createSelector(
  selectUser,
  (user: IUser | undefined) => user?.information.name || undefined
);

export const selectUserEmail = createSelector(
  selectUser,
  (user: IUser | undefined) => user?.information.email || undefined
);

export const selectUserRole = createSelector(selectUser, (user: IUser | undefined) => user?.role || undefined);

export const selectUserLoading = createSelector(selectUserState, (userState) => userState.isLoading);
