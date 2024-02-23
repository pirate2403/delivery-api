import { Error } from "mongoose";
import { IError, IErrorBody } from "../../interfaces/error.interface";
import { ERROR_STATUSES, ERROR_TYPES } from "./error.contsants";

export default class AppError extends Error implements IError {
  private readonly _status: number;

  private readonly _type: keyof typeof ERROR_TYPES;

  constructor(type: keyof typeof ERROR_TYPES, message: string) {
    super(message);
    this._status = ERROR_STATUSES[type];
    this._type = type;
  }

  get status(): number {
    return this._status;
  }

  get body(): IErrorBody {
    return {
      status: this._status,
      type: this._type,
      message: this.message,
    };
  }
}
