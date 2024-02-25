import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import bind from "bind-decorator";
import { IMiddleware } from "../interfaces/middleware.interfaces";
import TokenService from "../services/token/token.service";
import { ITokenService } from "../services/token/token-service.interface";
import { VERIFY_TYPE } from "../services/token/token.constants";

@singleton()
class TokenValidatorMiddleware implements IMiddleware {
  static readonly token = "TokenValidatorMiddleware";

  constructor(
    @inject(TokenService.token) private _tokenService: ITokenService,
  ) {}

  @bind
  handle(req: Request, _res: Response, next: NextFunction): void {
    try {
      const { authorization } = req.headers;
      const token = this._tokenService.getAuthorizationToken(authorization);
      this._tokenService.validate(token, VERIFY_TYPE.access);
      next();
    } catch (e) {
      next(e);
    }
  }
}

export default {
  token: TokenValidatorMiddleware.token,
  useClass: TokenValidatorMiddleware,
};
