import { NextFunction, Request, Response } from "express";
import { IError } from "./error.interface";

export interface IMiddleware {
  handle(error: IError, req: Request, res: Response, next: NextFunction): void;
}
