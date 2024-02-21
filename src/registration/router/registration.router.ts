import { Router } from "express";
import { inject, singleton } from "tsyringe";
import { IRouter } from "../../shared/interfaces/router.interface";
import { IController } from "../../shared/interfaces/controller.interface";

@singleton()
class RegistrationRouter implements IRouter {
  private _path: string = "/api";

  private _expressRouter: Router = Router();

  constructor(
    @inject("RegistrationController")
    private _registrationController: IController,
  ) {
    this._init();
  }

  private _init(): void {
    this._registrationController.matchers.forEach((item) => {
      this._expressRouter[item.method](item.path, item.handler);
    });
  }

  get path(): string {
    return this._path;
  }

  get expressRouter(): Router {
    return this._expressRouter;
  }
}

export default {
  token: "RegistrationRouter",
  useClass: RegistrationRouter,
};
