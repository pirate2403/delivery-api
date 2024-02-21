import { Express, urlencoded } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { inject, singleton } from "tsyringe";
import { IExpressService } from "../interfaces/express-service.interface";
import { ILoggerService } from "../../shared/interfaces/logger-service.interface";
import { IMiddleware } from "../../shared/interfaces/middleware.interface";

@singleton()
class ExpressService implements IExpressService {
  private _port: string = process.env.PORT || "";

  constructor(
    @inject("app") private _app: Express,
    @inject("LoggerService") private _logger: ILoggerService,
    @inject("ErrorMiddleware") private _errorMiddleware: IMiddleware,
  ) {}

  start(): void {
    this._app.use(cors());
    this._app.use(bodyParser.json());
    this._app.use(urlencoded({ extended: true }));
    this._app.use(this._errorMiddleware.handle);

    this._app.listen(this._port, () => {
      this._logger.info(`Server started on port ${this._port}`);
    });
  }
}

export default {
  token: "ExpressService",
  useClass: ExpressService,
};
