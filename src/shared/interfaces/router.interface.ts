import { Router as ExpressRouter } from "express";

export interface IRouter {
  path: string;
  expressRouter: ExpressRouter;
}
