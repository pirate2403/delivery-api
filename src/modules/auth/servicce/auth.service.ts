import { inject, singleton } from "tsyringe";
import bcrypt from "bcrypt";
import { IAuthService } from "./auth-service.interface";
import {
  IUserCreatePayload,
  IUserModel,
} from "../../../models/user/user.interfaces";
import UserModel from "../../../models/user/user.model";
import { SALT } from "../../../environment";
import TokenService from "../../../services/token/token.service";
import { ITokenService } from "../../../services/token/token-service.interface";
import { IRegistrationData } from "../interfaces/auth.interfaces";

@singleton()
class AuthService implements IAuthService {
  static readonly token = "AuthService";

  constructor(
    @inject(UserModel.token) private _userModel: IUserModel,
    @inject(TokenService.token) private _tokenService: ITokenService,
  ) {
    this.registration = this.registration.bind(this);
  }

  async registration(payload: IUserCreatePayload): Promise<IRegistrationData> {
    await this._userModel.checkExistence(payload.login);

    const user = await this._userModel.create({
      ...payload,
      password: bcrypt.hashSync(payload.password, SALT),
    });

    return {
      accessToken: await this._tokenService.generateAccessToken(user),
      refreshToken: await this._tokenService.generateRefreshToken(user),
    };
  }
}

export default {
  token: AuthService.token,
  useClass: AuthService,
};
