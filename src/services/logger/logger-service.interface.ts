export interface ILoggerService {
  info(message: unknown): void;

  success(message: unknown): void;

  warning(message: unknown): void;

  error(message: unknown): void;
}
