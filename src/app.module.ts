import { inject, registry, singleton } from "tsyringe";
import express from "express";
import { IExpressService } from "./services/express/express-service.interface";
import { IDbService } from "./services/db/db-service.interface";
import { IRouterService } from "./services/router/router-service.interface";
import ExpressService from "./services/express/express.service";
import DbService from "./services/db/db.service";
import RouterService from "./services/router/router.service";
import ErrorInterceptorMiddleware from "./middlewares/error-interceptor.middleware";
import LoggerService from "./services/logger/logger.service";
import ErrorService from "./services/error/error.service";
import AuthModule from "./modules/auth/auth.module";
import UserModel from "./models/user/user.model";
import TokenService from "./services/token/token.service";
import TokenValidatorMiddleware from "./middlewares/token-validator.middleware";
import TokenModel from "./models/token/token.model";
import CookieService from "./services/cookie/cookie.service";

const appContainer = {
  token: "app",
  useValue: express(),
};
@singleton()
@registry([
  appContainer,
  RouterService,
  ExpressService,
  DbService,
  AuthModule,
  ErrorInterceptorMiddleware,
  TokenValidatorMiddleware,
  LoggerService,
  ErrorService,
  UserModel,
  TokenModel,
  TokenService,
  CookieService,
])
export default class AppModule {
  constructor(
    @inject(DbService.token) private _dbService: IDbService,
    @inject(ExpressService.token) private _expressService: IExpressService,
    @inject(RouterService.token) private _routerService: IRouterService,
  ) {
    this._dbService.connect().finally(() => {
      this._expressService.start();
      this._routerService.register();
    });
  }
}
