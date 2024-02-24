import { PROD } from "../../../environment";

const TOKEN_COOKIE_SETTINGS = {
  refreshToken: {
    httpOnly: true,
    maxAge: 1206e6,
    secure: PROD,
  },
} as const;

export default TOKEN_COOKIE_SETTINGS;
