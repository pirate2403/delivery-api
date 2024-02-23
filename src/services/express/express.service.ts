import { Express, urlencoded } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { inject, singleton } from "tsyringe";
import Fingerprint from "express-fingerprint";
import { IExpressService } from "./express-service.interface";
import { ILoggerService } from "../logger/logger-service.interface";
import LoggerService from "../logger/logger.service";

@singleton()
class ExpressService implements IExpressService {
  static readonly token = "ExpressService";

  private _port: string = process.env.PORT || "";

  constructor(
    @inject("app") private _app: Express,
    @inject(LoggerService.token) private _logger: ILoggerService,
  ) {}

  start(): void {
    this._app.use(cors({ credentials: true }));
    this._app.use(bodyParser.json());
    this._app.use(cookieParser());
    this._app.use(urlencoded({ extended: true }));
    this._app.use(Fingerprint());

    this._app.listen(this._port, () => {
      this._logger.info(`Server started on port ${this._port}`);
    });
  }
}

export default {
  token: ExpressService.token,
  useClass: ExpressService,
};
