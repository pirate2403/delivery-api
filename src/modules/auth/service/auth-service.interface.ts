import {
  ILoginData,
  ILoginPayload,
  IRefreshData,
  IRegistrationData,
  IRegistrationPayload,
} from "../interfaces/auth.interfaces";

export interface IAuthService {
  registration(payload: IRegistrationPayload): Promise<IRegistrationData>;
  login(payload: ILoginPayload): Promise<ILoginData>;
  logout(refreshToken: string): Promise<void>;
  refresh(refreshToken?: string): Promise<IRefreshData>;
}
