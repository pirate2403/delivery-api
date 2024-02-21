import { Request, Response } from "express";
import { singleton } from "tsyringe";
import { IController } from "../../shared/interfaces/controller.interface";
import { IControllerMatcher } from "../../shared/interfaces/controller-matcher.interface";
import ROUTER_METHOD from "../../shared/constants/router-method.const";
import RESPONSE_STATUS from "../../shared/constants/response-status.const";

@singleton()
class RegistrationController implements IController {
  private _matchers: IControllerMatcher[] = [
    {
      method: ROUTER_METHOD.post,
      path: "/registration",
      handler: this._postRegistration.bind(this),
    },
  ];

  get matchers(): IControllerMatcher[] {
    return this._matchers;
  }

  private _postRegistration(req: Request, res: Response): void {
    res.status(RESPONSE_STATUS.success).json(req.body);
  }
}

export default {
  token: "RegistrationController",
  useClass: RegistrationController,
};
