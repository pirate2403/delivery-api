import { NextFunction, Request, Response } from "express";
import { IMiddleware } from "../interfaces/middleware.interface";
import { IError } from "../interfaces/error.interface";

class ErrorInterceptorMiddleware implements IMiddleware {
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
