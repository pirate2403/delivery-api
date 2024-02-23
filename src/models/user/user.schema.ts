import { Schema } from "mongoose";
import { IUser } from "./user.interfaces";

const userSchema = new Schema<IUser>({
  login: { type: String, unique: true },
  password: String,
});

export default userSchema;
