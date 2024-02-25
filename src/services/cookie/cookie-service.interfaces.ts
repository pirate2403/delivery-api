import { CookieOptions } from "express";

export interface ICookieParams {
  name: string;
  options: CookieOptions;
}
export interface ICookieService {
  refreshTokenParams(): ICookieParams;
}
