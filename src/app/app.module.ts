import { inject, registry, singleton } from "tsyringe";
import express from "express";
import { IExpressService } from "./interfaces/express-service.interface";
import { IDbService } from "./interfaces/db-service.interface";
import { IRouterService } from "./interfaces/router-service.interface";
import ExpressService from "./services/express.service";
import DbService from "./services/db.service";
import RouterService from "./services/router.service";
import RegistrationModule from "../registration/registration.module";
import ErrorMiddleware from "./middlewares/error.middleware";
import SharedModule from "../shared/shared.module";

const appContainer = {
  token: "app",
  useValue: express(),
};
@singleton()
@registry([
  appContainer,
  RouterService,
  ExpressService,
  DbService,
  SharedModule,
  RegistrationModule,
  ErrorMiddleware,
])
export default class AppModule {
  constructor(
    @inject("DbService") private _dbService: IDbService,
    @inject("ExpressService") private _expressService: IExpressService,
    @inject("RouterService") private _routerService: IRouterService,
  ) {
    this._dbService.connect().finally(() => {
      this._expressService.start();
      this._routerService.register();
    });
  }
}
