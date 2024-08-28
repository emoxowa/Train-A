export interface IUserResponse {
  name: string;
  email: string;
  role: Role;
}

export interface IUser {
  information: IUserInformation;
  role: Role;
}

export interface IUserInformation {
  name: string;
  email: string;
}

type Role = 'manager' | 'user';
