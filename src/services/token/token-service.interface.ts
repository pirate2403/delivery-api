export interface ITokenService {
  generateAccessToken(data: string | Buffer | object): Promise<string>;
  generateRefreshToken(data: string | Buffer | object): Promise<string>;
}
