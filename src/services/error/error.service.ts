import { singleton } from "tsyringe";
import { IErrorService } from "./error-service.interfaces";
import { IError } from "../../interfaces/error.interface";
import { ERROR_TYPES } from "./error.contsants";
import AppError from "./app-error.entity";

@singleton()
class ErrorService implements IErrorService {
  static readonly token = "ErrorService";

  throwBadRequest(
    type: keyof typeof ERROR_TYPES,
    message: string = type,
  ): IError {
    throw new AppError(type, message);
  }

  throwForbidden(
    type: keyof typeof ERROR_TYPES,
    message: string = type,
  ): IError {
    throw new AppError(type, message);
  }

  throwNotFound(
    type: keyof typeof ERROR_TYPES,
    message: string = type,
  ): IError {
    throw new AppError(type, message);
  }

  throwServerError(
    type: keyof typeof ERROR_TYPES,
    message: string = type,
  ): IError {
    throw new AppError(type, message);
  }

  throwUnauthorized(
    type: keyof typeof ERROR_TYPES,
    message: string = type,
  ): IError {
    throw new AppError(type, message);
  }
}

export default {
  token: ErrorService.token,
  useClass: ErrorService,
};
