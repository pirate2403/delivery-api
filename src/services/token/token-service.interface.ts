import { JwtPayload } from "jsonwebtoken";
import { VERIFY_TYPE } from "./token.constants";

export interface ITokenService {
  generateAccessToken(data: string | Buffer | object): Promise<string>;
  generateRefreshToken(data: string | Buffer | object): Promise<string>;
  validate(token: string, type: keyof typeof VERIFY_TYPE): boolean;
  verify<T = string | JwtPayload>(
    token: string,
    type: keyof typeof VERIFY_TYPE,
  ): T;
  getAuthorizationToken(authorization?: string): string;
}
