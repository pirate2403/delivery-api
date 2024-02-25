export interface IErrorService {
  throwBadRequest(type?: string, message?: string): Error;

  throwUnauthorized(type?: string, message?: string): Error;

  throwForbidden(type?: string, message?: string): Error;

  throwNotFound(type?: string, message?: string): Error;

  throwServerError(type?: string, message?: string): Error;
}
