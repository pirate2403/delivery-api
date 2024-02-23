import { inject, singleton } from "tsyringe";
import { IAuthService } from "./auth-service.interface";
import {
  IUserCreatePayload,
  IUserModel,
} from "../../../models/user/user.interfaces";
import UserModel from "../../../models/user/user.model";
import UserDto from "../../../models/user/user.dto";

@singleton()
class AuthService implements IAuthService {
  static readonly token = "AuthService";

  constructor(@inject(UserModel.token) private _userModel: IUserModel) {
    this.registration = this.registration.bind(this);
  }

  async registration(payload: IUserCreatePayload): Promise<UserDto> {
    await this._userModel.checkExistence(payload.login);
    return this._userModel.create(payload);
  }
}

export default {
  token: AuthService.token,
  useClass: AuthService,
};
