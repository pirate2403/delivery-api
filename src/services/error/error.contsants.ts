export const ERROR_TYPES = {
  badRequest: "badRequest",
  alreadyExist: "alreadyExist",
  unauthorized: "unauthorized",
  forbidden: "forbidden",
  notFound: "notFound",
  serverError: "serverError",
} as const;
export const ERROR_STATUSES = {
  [ERROR_TYPES.badRequest]: 400,
  [ERROR_TYPES.unauthorized]: 401,
  [ERROR_TYPES.forbidden]: 403,
  [ERROR_TYPES.alreadyExist]: 403,
  [ERROR_TYPES.notFound]: 404,
  [ERROR_TYPES.serverError]: 500,
} as const;
