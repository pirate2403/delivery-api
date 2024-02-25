import jwt, { JwtPayload } from "jsonwebtoken";
import { inject, singleton } from "tsyringe";
import bind from "bind-decorator";
import { ITokenService } from "./token-service.interface";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../environment";
import {
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
  VERIFY_ERROR_TYPES,
  VERIFY_TYPE,
  VERIFY_TYPE_SECRET,
} from "./token.constants";
import ErrorService from "../error/error.service";
import { IErrorService } from "../error/error-service.interfaces";
import { ERROR_TYPES } from "../error/error.contsants";

@singleton()
class TokenService implements ITokenService {
  static readonly token = "TokenService";

  constructor(
    @inject(ErrorService.token) private _errorService: IErrorService,
  ) {}

  @bind
  async generateAccessToken(data: string | Buffer | object): Promise<string> {
    return jwt.sign(data, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_EXPIRES_IN,
    });
  }

  @bind
  async generateRefreshToken(data: string | Buffer | object): Promise<string> {
    return jwt.sign(data, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_EXPIRES_IN,
    });
  }

  @bind
  verify<T = string | JwtPayload>(
    token: string,
    type: keyof typeof VERIFY_TYPE,
  ): T {
    try {
      return jwt.verify(token, VERIFY_TYPE_SECRET[type]) as T;
    } catch {
      throw this._errorService.throwForbidden(VERIFY_ERROR_TYPES[type]);
    }
  }

  @bind
  validate(token: string, type: keyof typeof VERIFY_TYPE): boolean {
    return !!this.verify(token, type);
  }

  @bind
  getAuthorizationToken(authorization?: string): string {
    if (!authorization) {
      throw this._errorService.throwUnauthorized(ERROR_TYPES.unauthorized);
    }
    return authorization?.split(" ")[1];
  }
}

export default {
  token: TokenService.token,
  useClass: TokenService,
};
