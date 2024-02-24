import { IError } from "../../interfaces/error.interface";

export interface IErrorService {
  throwBadRequest(type?: string, message?: string): IError;

  throwUnauthorized(type?: string, message?: string): IError;

  throwForbidden(type?: string, message?: string): IError;

  throwNotFound(type?: string, message?: string): IError;

  throwServerError(type?: string, message?: string): IError;
}
