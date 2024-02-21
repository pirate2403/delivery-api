import { singleton } from "tsyringe";
import { IErrorService } from "../interfaces/error-service.interface";
import { IError } from "../interfaces/error.interface";
import {
  ERROR_KEYS,
  ERROR_MESSAGES,
  ERROR_STATUSES,
} from "../constants/error.contsants";

@singleton()
class ErrorService implements IErrorService {
  private _create(key: keyof typeof ERROR_KEYS): IError {
    return {
      status: ERROR_STATUSES[key],
      error: new Error(ERROR_MESSAGES[key]),
    };
  }

  badRequest(): IError {
    return this._create(ERROR_KEYS.badRequest);
  }

  forbidden(): IError {
    return this._create(ERROR_KEYS.forbidden);
  }

  notFound(): IError {
    return this._create(ERROR_KEYS.notFound);
  }

  serverError(): IError {
    return this._create(ERROR_KEYS.serverError);
  }

  unauthorized(): IError {
    return this._create(ERROR_KEYS.unauthorized);
  }
}

export default {
  token: "ErrorService",
  useClass: ErrorService,
};
