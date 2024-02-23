import { IUserCreatePayload } from "../../../models/user/user.interfaces";
import UserDto from "../../../models/user/user.dto";

export interface IAuthService {
  registration(payload: IUserCreatePayload): Promise<UserDto>;
}
