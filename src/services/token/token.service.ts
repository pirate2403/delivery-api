import jwt from "jsonwebtoken";
import { ITokenService } from "./token-service.interface";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../environment";
import { ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN } from "./token.constants";

class TokenService implements ITokenService {
  static readonly token = "TokenService";

  async generateAccessToken(data: string | Buffer | object): Promise<string> {
    return jwt.sign(data, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_EXPIRES_IN,
    });
  }

  async generateRefreshToken(data: string | Buffer | object): Promise<string> {
    return jwt.sign(data, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_EXPIRES_IN,
    });
  }
}

export default {
  token: TokenService.token,
  useClass: TokenService,
};
