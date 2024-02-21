import { singleton } from "tsyringe";
import LOG_COLORS from "../constants/logger.constants";
import { ILoggerService } from "../interfaces/logger-service.interface";

@singleton()
class LoggerService implements ILoggerService {
  private _log(message: string, color: string): void {
    // eslint-disable-next-line no-console
    console.log(color, message, LOG_COLORS.default);
  }

  info(message: string): void {
    this._log(message, LOG_COLORS.info);
  }

  error(message: string): void {
    this._log(message, LOG_COLORS.error);
  }

  success(message: string): void {
    this._log(message, LOG_COLORS.success);
  }

  warning(message: string): void {
    this._log(message, LOG_COLORS.warning);
  }
}

export default {
  token: "LoggerService",
  useClass: LoggerService,
};
