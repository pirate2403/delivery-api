import { IError } from "./error.interface";

export interface IErrorService {
  badRequest(): IError;

  unauthorized(): IError;

  forbidden(): IError;

  notFound(): IError;

  serverError(): IError;
}
