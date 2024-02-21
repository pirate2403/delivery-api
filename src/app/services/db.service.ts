import { inject, singleton } from "tsyringe";
import mongoose from "mongoose";
import { IDbService } from "../interfaces/db-service.interface";
import { ILoggerService } from "../../shared/interfaces/logger-service.interface";

@singleton()
class DbService implements IDbService {
  private _uri: string = process.env.MONGO_URI || "";

  private _client: typeof mongoose = mongoose;

  constructor(@inject("LoggerService") private logger: ILoggerService) {}

  private async _connectMongo(): Promise<void> {
    return this._client
      .connect(this._uri)
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
  token: "DbService",
  useClass: DbService,
};
