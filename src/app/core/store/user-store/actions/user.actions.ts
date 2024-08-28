import { IUser, IUserInformation } from '@app/auth/models/user.model';
import { createAction, props } from '@ngrx/store';

export enum EUserActions {
  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  LoadUserFailure = '[User] Load User Failure',
  UpdateUserInformation = '[User] Update User Information',
  UpdateUserInformationSuccess = '[User] Update User Information Success',
  UpdateUserInformationFailure = '[User] Update User Information Failure',
  UpdatePassword = '[User] Change Password',
  UpdatePasswordSuccess = '[User] Change Password Success',
  UpdatePasswordFailure = '[User] Change Password Failure',
  Logout = '[User] Logout',
  LogoutSuccess = '[User] Logout Success',
  LogoutFailure = '[User] Logout Failure',
}

export const UserActions = {
  loadUser: createAction(EUserActions.LoadUser),
  loadUserSuccess: createAction(EUserActions.LoadUserSuccess, props<{ user: IUser }>()),
  loadUserFailure: createAction(EUserActions.LoadUserFailure),
  updateUserInformation: createAction(
    EUserActions.UpdateUserInformation,
    props<{ updates: Partial<IUserInformation> }>()
  ),
  updateUserInformationSuccess: createAction(
    EUserActions.UpdateUserInformationSuccess,
    props<{ userInformation: IUserInformation }>()
  ),
  updateUserInformationFailure: createAction(EUserActions.UpdateUserInformationFailure),
  updatePassword: createAction(EUserActions.UpdatePassword, props<{ password: string }>()),
  updatePasswordSuccess: createAction(EUserActions.UpdatePasswordSuccess),
  updatePasswordFailure: createAction(EUserActions.UpdatePasswordFailure),
  logout: createAction(EUserActions.Logout),
  logoutSuccess: createAction(EUserActions.LogoutSuccess),
  logoutFailure: createAction(EUserActions.LogoutFailure),
};
