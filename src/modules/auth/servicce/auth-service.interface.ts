import { IUserCreatePayload } from "../../../models/user/user.interfaces";
import { IRegistrationData } from "../interfaces/auth.interfaces";

export interface IAuthService {
  registration(payload: IUserCreatePayload): Promise<IRegistrationData>;
}
