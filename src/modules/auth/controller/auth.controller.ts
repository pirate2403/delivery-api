import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import { Params } from "express-serve-static-core";
import { IAuthService } from "../servicce/auth-service.interface";
import {
  IController,
  IControllerMatcher,
} from "../../../interfaces/controller.interfaces";
import ROUTER_METHOD from "../../../constants/router-method.const";
import RESPONSE_STATUS from "../../../constants/response-status.const";
import { IUserCreatePayload } from "../../../models/user/user.interfaces";
import AuthService from "../servicce/auth.service";
import LoggerService from "../../../services/logger/logger.service";
import { ILoggerService } from "../../../services/logger/logger-service.interface";
import { IRegistrationPayload } from "../interfaces/auth.interfaces";
import TOKEN_COOKIE_SETTINGS from "../constants/cookie";

@singleton()
class AuthController implements IController {
  static readonly token = "AuthController";

  private _matchers: IControllerMatcher[] = [
    {
      method: ROUTER_METHOD.post,
      path: "/auth",
      handler: this._registration.bind(this),
    },
  ];

  constructor(
    @inject(AuthService.token) private _authService: IAuthService,
    @inject(LoggerService.token) private _loggerService: ILoggerService,
  ) {
    this._registration = this._registration.bind(this);
  }

  get matchers(): IControllerMatcher[] {
    return this._matchers;
  }

  private async _registration(
    req: Request<Params, IRegistrationPayload, IUserCreatePayload>,
    res: Response<IRegistrationPayload>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { accessToken, refreshToken } =
        await this._authService.registration(req.body);

      res.cookie(
        "refreshToken",
        refreshToken,
        TOKEN_COOKIE_SETTINGS.refreshToken,
      );

      res.status(RESPONSE_STATUS.success).json({ accessToken });
    } catch (e) {
      this._loggerService.error(e);
      next(e);
    }
  }
}

export default {
  token: AuthController.token,
  useClass: AuthController,
};
