import { IUser } from '@app/train/models/user.model';

export interface IUserState {
  user: IUser | undefined;
  isLoading: boolean;
}

export const initialUserState: IUserState = {
  user: undefined,
  isLoading: false,
};
