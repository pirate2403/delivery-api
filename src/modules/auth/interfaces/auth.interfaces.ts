import { IUserCreatePayload } from "../../../models/user/user.interfaces";

export interface IAuthResponseData {
  accessToken: string;
}

export interface IRegistrationData {
  accessToken: string;
  refreshToken: string;
}

export interface IRegistrationPayload extends IUserCreatePayload {}

export interface ILoginData {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginPayload extends IUserCreatePayload {}

export interface IRefreshData {
  accessToken: string;
  refreshToken: string;
}
