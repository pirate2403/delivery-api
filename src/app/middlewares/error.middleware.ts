/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request, NextFunction } from "express";
import { IMiddleware } from "../../shared/interfaces/middleware.interface";
import { IError } from "../../shared/interfaces/error.interface";

class ErrorMiddleware implements IMiddleware {
  handle(
    { status, error }: IError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    res.status(status).json({ error: error.message });
  }
}

export default {
  token: "ErrorMiddleware",
  useClass: ErrorMiddleware,
};
