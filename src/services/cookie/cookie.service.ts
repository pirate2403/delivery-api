import { singleton } from "tsyringe";
import bind from "bind-decorator";
import { ICookieParams, ICookieService } from "./cookie-service.interfaces";
import { REFRESH_TOKEN_PARAMS } from "./cookie-service.constants";

@singleton()
class CookieService implements ICookieService {
  static readonly token = "CookieService";

  @bind
  refreshTokenParams(): ICookieParams {
    return REFRESH_TOKEN_PARAMS;
  }
}

export default {
  token: CookieService.token,
  useClass: CookieService,
};
