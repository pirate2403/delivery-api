import { Types } from "mongoose";

export interface IUserModel {
  create(payload: IUserCreatePayload): Promise<IUser>;

  checkExistence(login: string): Promise<boolean>;
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
