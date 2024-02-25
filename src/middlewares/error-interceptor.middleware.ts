import { NextFunction, Request, Response } from "express";
import { IErrorMiddleware } from "../interfaces/middleware.interfaces";
import { IError } from "../interfaces/error.interface";

class ErrorInterceptorMiddleware implements IErrorMiddleware {
  static readonly token = "ErrorInterceptorMiddleware";

  handle(
    error: IError,
    _req: Request,
    res: Response,
    __next: NextFunction,
  ): void {
    res.status(error.status).json({ ...error.body });
  }
}

export default {
  token: ErrorInterceptorMiddleware.token,
  useClass: ErrorInterceptorMiddleware,
};
