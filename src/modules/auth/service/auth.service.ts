import { inject, singleton } from "tsyringe";
import bcrypt from "bcrypt";
import bind from "bind-decorator";
import { IAuthService } from "./auth-service.interface";
import {
  IExtendedUserData,
  IUser,
  IUserCreatePayload,
  IUserModel,
} from "../../../models/user/user.interfaces";
import UserModel from "../../../models/user/user.model";
import { SALT } from "../../../environment";
import TokenService from "../../../services/token/token.service";
import { ITokenService } from "../../../services/token/token-service.interface";
import { IRefreshData, IRegistrationData } from "../interfaces/auth.interfaces";
import TokenModel from "../../../models/token/token.model";
import { ITokenModel } from "../../../models/token/token.interfaces";
import ErrorService from "../../../services/error/error.service";
import { IErrorService } from "../../../services/error/error-service.interfaces";
import { ERROR_TYPES } from "../../../services/error/error.contsants";
import { VERIFY_TYPE } from "../../../services/token/token.constants";

@singleton()
class AuthService implements IAuthService {
  static readonly token = "AuthService";

  constructor(
    @inject(UserModel.token) private _userModel: IUserModel,
    @inject(TokenModel.token) private _tokenModel: ITokenModel,
    @inject(TokenService.token) private _tokenService: ITokenService,
    @inject(ErrorService.token) private _errorService: IErrorService,
  ) {}

  @bind
  async registration(payload: IUserCreatePayload): Promise<IRegistrationData> {
    const existed = await this._userModel.getUserByLogin(payload.login);

    if (existed) {
      throw this._errorService.throwForbidden(ERROR_TYPES.exist);
    }

    const user = await this._userModel.create({
      ...payload,
      password: bcrypt.hashSync(payload.password, SALT),
    });

    const accessToken = await this._tokenService.generateAccessToken(user);
    const refreshToken = await this._tokenService.generateRefreshToken(user);

    await this._tokenModel.create({ userId: user.id, refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  @bind
  async login(payload: IUserCreatePayload): Promise<IRegistrationData> {
    const user = await this._userModel.getUserByLogin(payload.login);

    if (!user) {
      throw this._errorService.throwNotFound(ERROR_TYPES.notFound);
    }

    const isPasswordValid = bcrypt.compareSync(payload.password, user.password);

    if (!isPasswordValid) {
      throw this._errorService.throwUnauthorized(ERROR_TYPES.incorrectData);
    }

    const accessToken = await this._tokenService.generateAccessToken(user);
    const refreshToken = await this._tokenService.generateRefreshToken(user);

    await this._tokenModel.create({ userId: user.id, refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  @bind
  async logout(refreshToken: string): Promise<void> {
    const user = this._tokenService.verify<IUser>(
      refreshToken,
      VERIFY_TYPE.refresh,
    );
    await this._userModel.remove(user.login);
    return this._tokenModel.remove(refreshToken);
  }

  @bind
  async refresh(refreshTokenPayload?: string): Promise<IRefreshData> {
    if (!refreshTokenPayload) {
      throw this._errorService.throwUnauthorized(ERROR_TYPES.unauthorized);
    }

    const tokenData = await this._tokenModel.findByToken(refreshTokenPayload);

    if (!tokenData) {
      throw this._errorService.throwUnauthorized(ERROR_TYPES.unauthorized);
    }

    await this._tokenModel.remove(refreshTokenPayload);

    const verified = this._tokenService.verify<IExtendedUserData>(
      refreshTokenPayload,
      VERIFY_TYPE.refresh,
    );

    const user = this._userModel.parseUserFromExtendedUserData(verified);

    const accessToken = await this._tokenService.generateAccessToken(user);
    const refreshToken = await this._tokenService.generateRefreshToken(user);

    await this._tokenModel.create({
      refreshToken,
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default {
  token: AuthService.token,
  useClass: AuthService,
};
