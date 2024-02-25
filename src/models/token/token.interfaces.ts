import { Types } from "mongoose";

export interface ITokenModel {
  create(payload: ITokenCreatePayload): Promise<IToken>;
  remove(refreshToken: string): Promise<void>;
  findByToken(refreshToken: string): Promise<IToken | null>;
}

export interface ITokenCreatePayload {
  userId: Types.ObjectId;
  refreshToken: string;
}

export interface IToken {
  id: Types.ObjectId;
  user: Types.ObjectId;
  refreshToken: string;
}
