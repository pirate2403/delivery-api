import { Schema } from "mongoose";
import { IToken } from "./token.interfaces";

const tokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: "UserModel" },
  refreshToken: String,
});

export default tokenSchema;
