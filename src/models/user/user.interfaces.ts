import { Types } from "mongoose";
import UserDto from "./user.dto";

export interface IUserModel {
  create(payload: IUserCreatePayload): Promise<UserDto>;

  checkExistence(login: string): Promise<boolean>;
}

export interface IUserCreatePayload {
  login: string;
  password: string;
}

export interface IUser {
  _id: Types.ObjectId;
  login: string;
  password: string;
}
