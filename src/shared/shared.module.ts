import { registry, singleton } from "tsyringe";
import LoggerService from "./services/logger.service";
import ErrorService from "./services/error.service";

@singleton()
@registry([LoggerService, ErrorService])
class SharedModule {}

export default {
  token: "SharedModule",
  useClass: SharedModule,
};
