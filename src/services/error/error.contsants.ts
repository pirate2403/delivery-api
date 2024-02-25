export const ERROR_TYPES = {
  badRequest: "badRequest",
  exist: "exist",
  unauthorized: "unauthorized",
  incorrectData: "incorrectData",
  forbidden: "forbidden",
  invalidAccessToken: "invalidAccessToken",
  invalidRefreshToken: "invalidRefreshToken",
  notFound: "notFound",
  serverError: "serverError",
} as const;
export const ERROR_STATUSES = {
  [ERROR_TYPES.badRequest]: 400,
  [ERROR_TYPES.unauthorized]: 401,
  [ERROR_TYPES.incorrectData]: 401,
  [ERROR_TYPES.forbidden]: 403,
  [ERROR_TYPES.invalidAccessToken]: 403,
  [ERROR_TYPES.invalidRefreshToken]: 403,
  [ERROR_TYPES.exist]: 403,
  [ERROR_TYPES.notFound]: 404,
  [ERROR_TYPES.serverError]: 500,
} as const;
