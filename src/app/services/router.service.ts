import { inject, singleton } from "tsyringe";
import { Express } from "express";
import { IRouterService } from "../interfaces/router-service.interface";
import { IRouter } from "../../shared/interfaces/router.interface";

@singleton()
class RouterService implements IRouterService {
  private _routers: IRouter[];

  constructor(
    @inject("app") private _app: Express,
    @inject("RegistrationRouter") registration: IRouter,
  ) {
    this._routers = [registration];
  }

  register(): void {
    this._routers.forEach((router) => {
      this._app.use(router.path, router.expressRouter);
    });
  }
}

export default {
  token: "RouterService",
  useClass: RouterService,
};
