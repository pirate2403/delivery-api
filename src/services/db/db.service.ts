import { inject, singleton } from "tsyringe";
import mongoose from "mongoose";
import { IDbService } from "./db-service.interface";
import { ILoggerService } from "../logger/logger-service.interface";
import LoggerService from "../logger/logger.service";
import { MONGO_URI } from "../../environment";

@singleton()
class DbService implements IDbService {
  static readonly token = "DbService";

  private _client: typeof mongoose = mongoose;

  constructor(@inject(LoggerService.token) private logger: ILoggerService) {}

  private async _connectMongo(): Promise<void> {
    return this._client
      .connect(MONGO_URI)
      .then(() => {
        this.logger.success("Data base connection successful");
      })
      .catch(() => {
        this.logger.error("Data base connection failed");
      });
  }

  async connect(): Promise<void> {
    return this._connectMongo();
  }
}

export default {
  token: DbService.token,
  useClass: DbService,
};
