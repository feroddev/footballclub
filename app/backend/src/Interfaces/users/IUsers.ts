import { Identifiable } from '..';

export interface IUsers extends Identifiable {
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface IUserToken {
  token: string,
}

export interface IUserRole {
  role: string,
}
