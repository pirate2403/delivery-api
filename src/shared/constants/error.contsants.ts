export const ERROR_KEYS = {
  badRequest: "badRequest",
  unauthorized: "unauthorized",
  forbidden: "forbidden",
  notFound: "notFound",
  serverError: "serverError",
} as const;
export const ERROR_STATUSES = {
  [ERROR_KEYS.badRequest]: 400,
  [ERROR_KEYS.unauthorized]: 401,
  [ERROR_KEYS.forbidden]: 403,
  [ERROR_KEYS.notFound]: 404,
  [ERROR_KEYS.serverError]: 500,
} as const;

export const ERROR_MESSAGES = {
  [ERROR_KEYS.badRequest]: "400",
  [ERROR_KEYS.unauthorized]: "401",
  [ERROR_KEYS.forbidden]: "403",
  [ERROR_KEYS.notFound]: "404",
  [ERROR_KEYS.serverError]: "Возникла непредвиденная ошибка",
} as const;
