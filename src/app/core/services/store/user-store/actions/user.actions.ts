import { IUser, IUserInformation } from '@app/auth/models/user.model';
import { createAction, props } from '@ngrx/store';

export enum EUserActions {
  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  UpdateUserInformation = '[User] Update User Information',
  UpdateUserInformationSuccess = '[User] Update User Information Success',
  UpdatePassword = '[User] Change Password',
  UpdatePasswordSuccess = '[User] Change Password Success',
  Logout = '[User] Logout',
  LogoutSuccess = '[User] Logout Success',
}

export const UserActions = {
  loadUser: createAction(EUserActions.LoadUser),
  loadUserSuccess: createAction(EUserActions.LoadUserSuccess, props<{ user: IUser }>()),
  updateUserInformation: createAction(
    EUserActions.UpdateUserInformation,
    props<{ updates: Partial<IUserInformation> }>()
  ),
  updateUserInformationSuccess: createAction(
    EUserActions.UpdateUserInformationSuccess,
    props<{ userInformation: IUserInformation }>()
  ),
  updatePassword: createAction(EUserActions.UpdatePassword, props<{ password: string }>()),
  updatePasswordSuccess: createAction(EUserActions.UpdatePasswordSuccess),
  logout: createAction(EUserActions.Logout),
  logoutSuccess: createAction(EUserActions.LogoutSuccess),
};
