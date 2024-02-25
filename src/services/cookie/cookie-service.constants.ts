import { PROD } from "../../environment";

export const TOKEN_COOKIE_SETTINGS = {
  refreshToken: {
    httpOnly: true,
    maxAge: 1206e6,
    secure: PROD,
  },
} as const;

export const REFRESH_TOKEN_PARAMS = {
  name: "refreshToken",
  options: TOKEN_COOKIE_SETTINGS.refreshToken,
};
