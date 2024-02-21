import { RequestHandler } from "express";
import ROUTER_METHOD from "../constants/router-method.const";

export interface IControllerMatcher {
  path: string;
  method: keyof typeof ROUTER_METHOD;
  handler: RequestHandler;
}
