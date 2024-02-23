import { singleton } from "tsyringe";
import LOG_COLORS from "./logger.constants";
import { ILoggerService } from "./logger-service.interface";

@singleton()
class LoggerService implements ILoggerService {
  static readonly token = "LoggerService";

  private _log(message: string, color: string): void {
    // eslint-disable-next-line no-console
    console.log(color, message, LOG_COLORS.default);
  }

  info(message: unknown): void {
    this._log(JSON.stringify(message, undefined, 2), LOG_COLORS.info);
  }

  error(message: unknown): void {
    this._log(JSON.stringify(message, undefined, 2), LOG_COLORS.error);
  }

  success(message: unknown): void {
    this._log(JSON.stringify(message, undefined, 2), LOG_COLORS.success);
  }

  warning(message: unknown): void {
    this._log(JSON.stringify(message, undefined, 2), LOG_COLORS.warning);
  }
}

export default {
  token: LoggerService.token,
  useClass: LoggerService,
};
