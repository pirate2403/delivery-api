import { registry, singleton } from "tsyringe";
import RegistrationRouter from "./router/registration.router";
import RegistrationController from "./controller/registration.controller";

@singleton()
@registry([RegistrationController, RegistrationRouter])
class RegistrationModule {}

export default {
  token: "RegistrationModule",
  useClass: RegistrationModule,
};
