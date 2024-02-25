import { Types } from "mongoose";

export interface IUserModel {
  create(payload: IUserCreatePayload): Promise<IUser>;
  getUserByLogin(login: string): Promise<IUser | null>;
  remove(login: string): Promise<void>;
  parseUserFromExtendedUserData(data: IExtendedUserData): IUser;
}

export interface IExtendedUserData extends IUser {
  [k: string]: unknown;
}
export interface IUserCreatePayload {
  login: string;
  password: string;
}

export interface IUser {
  id: Types.ObjectId;
  login: string;
  password: string;
}
