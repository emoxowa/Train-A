export const enum EUserRole {
  manager = 'manager',
  user = 'user',
}

export interface IUserResponse {
  name: string;
  email: string;
  role: EUserRole;
  id?: number;
}

export interface IUser {
  information: IUserInformation;
  role: EUserRole;
}

export interface IUserInformation {
  name: string;
  email: string;
}
