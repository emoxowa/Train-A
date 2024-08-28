import { createReducer, on } from '@ngrx/store';
import { initialUserState, IUserState } from '../state/user-state';
import { UserActions } from '../actions/user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loadUser, (state): IUserState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UserActions.loadUserSuccess, (state, { user }): IUserState => {
    return {
      ...state,
      user,
      isLoading: false,
    };
  }),
  on(UserActions.updateUserInformation, (state, { updates }): IUserState => {
    if (!state.user) return state;

    return {
      ...state,
      user: {
        ...state.user,
        information: {
          ...state.user.information,
          ...updates,
        },
      },
    };
  }),
  on(UserActions.logoutSuccess, (state): IUserState => {
    return { ...state, user: undefined };
  })
);
