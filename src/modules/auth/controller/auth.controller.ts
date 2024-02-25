import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import { Params } from "express-serve-static-core";
import bind from "bind-decorator";
import { IAuthService } from "../service/auth-service.interface";
import {
  IController,
  IControllerMatcher,
} from "../../../interfaces/controller.interfaces";
import ROUTER_METHOD from "../../../constants/router-method.const";
import RESPONSE_STATUS from "../../../constants/response-status.const";
import AuthService from "../service/auth.service";
import {
  IAuthResponseData,
  ILoginPayload,
  IRegistrationPayload,
} from "../interfaces/auth.interfaces";
import CookieService from "../../../services/cookie/cookie.service";
import { ICookieService } from "../../../services/cookie/cookie-service.interfaces";

@singleton()
class AuthController implements IController {
  static readonly token = "AuthController";

  private _matchers: IControllerMatcher[] = [
    {
      method: ROUTER_METHOD.post,
      path: "/registration",
      handlers: [this._registration],
    },
    {
      method: ROUTER_METHOD.post,
      path: "/login",
      handlers: [this._login],
    },
    {
      method: ROUTER_METHOD.post,
      path: "/logout",
      handlers: [this._logout],
    },
    {
      method: ROUTER_METHOD.post,
      path: "/refresh",
      handlers: [this._refresh],
    },
  ];

  constructor(
    @inject(AuthService.token) private _authService: IAuthService,
    @inject(CookieService.token) private _cookieService: ICookieService,
  ) {}

  get matchers(): IControllerMatcher[] {
    return this._matchers;
  }

  @bind
  private async _registration(
    req: Request<Params, IAuthResponseData, IRegistrationPayload>,
    res: Response<IAuthResponseData>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { body } = req;
      const data = await this._authService.registration(body);
      const { name, options } = this._cookieService.refreshTokenParams();

      res.cookie(name, data.refreshToken, options);
      res.status(RESPONSE_STATUS.success);
      res.json({ accessToken: data.accessToken });
    } catch (e) {
      next(e);
    }
  }

  @bind
  private async _login(
    req: Request<Params, IAuthResponseData, ILoginPayload>,
    res: Response<IAuthResponseData>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { body } = req;
      const data = await this._authService.login(body);
      const { name, options } = this._cookieService.refreshTokenParams();

      res.cookie(name, data.refreshToken, options);
      res.status(RESPONSE_STATUS.success);
      res.json({ accessToken: data.accessToken });
    } catch (e) {
      next(e);
    }
  }

  @bind
  private async _logout(
    req: Request<Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { refreshToken } = req.cookies;
      await this._authService.logout(refreshToken);
      const { name } = this._cookieService.refreshTokenParams();
      res.clearCookie(name);
      res.status(RESPONSE_STATUS.success).json();
    } catch (e) {
      next(e);
    }
  }

  @bind
  private async _refresh(
    req: Request<Params, IAuthResponseData>,
    res: Response<IAuthResponseData>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { refreshToken } = req.cookies;
      const data = await this._authService.refresh(refreshToken);
      const { name, options } = this._cookieService.refreshTokenParams();
      res.cookie(name, data.refreshToken, options);
      res.status(RESPONSE_STATUS.success);
      res.json({ accessToken: data.accessToken });
    } catch (e) {
      next(e);
    }
  }
}

export default {
  token: AuthController.token,
  useClass: AuthController,
};
