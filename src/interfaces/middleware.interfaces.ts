import { NextFunction, Request, Response } from "express";
import { IError } from "./error.interface";

export interface IMiddleware {
  handle(req: Request, res: Response, next: NextFunction): void;
}
export interface IErrorMiddleware {
  handle(error: IError, req: Request, res: Response, next: NextFunction): void;
}
