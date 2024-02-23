import { Types } from "mongoose";

export default class UserDto {
  readonly id: Types.ObjectId;

  readonly login: string;

  constructor(id: Types.ObjectId, login: string) {
    this.id = id;
    this.login = login;
  }
}
