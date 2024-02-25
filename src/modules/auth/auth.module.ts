import { registry, singleton } from "tsyringe";
import AuthRouter from "./router/auth.router";
import AuthController from "./controller/auth.controller";
import AuthService from "./service/auth.service";

@singleton()
@registry([AuthController, AuthRouter, AuthService])
class AuthModule {
  static readonly token = "AuthModule";
}

export default {
  token: AuthModule.token,
  useClass: AuthModule,
};
