import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../environment";
import { ERROR_TYPES } from "../error/error.contsants";

export const ACCESS_EXPIRES_IN = "15m";
export const REFRESH_EXPIRES_IN = "15d";

export const VERIFY_TYPE = {
  access: "access",
  refresh: "refresh",
} as const;
export const VERIFY_TYPE_SECRET = {
  [VERIFY_TYPE.access]: ACCESS_TOKEN_SECRET,
  [VERIFY_TYPE.refresh]: REFRESH_TOKEN_SECRET,
} as const;

export const VERIFY_ERROR_TYPES = {
  [VERIFY_TYPE.access]: ERROR_TYPES.invalidAccessToken,
  [VERIFY_TYPE.refresh]: ERROR_TYPES.invalidRefreshToken,
} as const;
