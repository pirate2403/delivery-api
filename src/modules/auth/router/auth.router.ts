import { Router } from "express";
import { inject, singleton } from "tsyringe";
import { IRouter } from "../../../interfaces/router.interface";
import { IController } from "../../../interfaces/controller.interfaces";
import AuthController from "../controller/auth.controller";

@singleton()
class AuthRouter implements IRouter {
  static readonly token = "AuthRouter";

  private _expressRouter: Router = Router();

  constructor(
    @inject(AuthController.token)
    private _authController: IController,
  ) {
    this._init();
  }

  private _init(): void {
    this._authController.matchers.forEach((item) => {
      this._expressRouter[item.method](item.path, item.handlers);
    });
  }

  get expressRouter(): Router {
    return this._expressRouter;
  }
}

export default {
  token: AuthRouter.token,
  useClass: AuthRouter,
};
