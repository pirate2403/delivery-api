import { inject, singleton } from "tsyringe";
import { Express } from "express";
import { IRouterService } from "./router-service.interface";
import { IRouter } from "../../interfaces/router.interface";
import AuthRouter from "../../modules/auth/router/auth.router";
import ErrorInterceptorMiddleware from "../../middlewares/error-interceptor.middleware";
import { IMiddleware } from "../../interfaces/middleware.interfaces";

@singleton()
class RouterService implements IRouterService {
  static readonly token = "RouterService";

  private _path: string = "/api";

  constructor(
    @inject("app") private _app: Express,
    @inject(ErrorInterceptorMiddleware.token)
    private _errorInterceptorMiddleware: IMiddleware,
    @inject(AuthRouter.token) auth: IRouter,
  ) {
    this._routers = [auth];
  }

  private _routers: IRouter[];

  register(): void {
    this._routers.forEach((router) => {
      this._app.use(this._path, router.expressRouter);
    });
    this._app.use(this._errorInterceptorMiddleware.handle);
  }
}

export default {
  token: RouterService.token,
  useClass: RouterService,
};
