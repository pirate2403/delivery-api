import { model } from "mongoose";
import { inject, singleton } from "tsyringe";
import { IUser, IUserCreatePayload, IUserModel } from "./user.interfaces";
import userSchema from "./user.schema";
import { IErrorService } from "../../services/error/error-service.interfaces";
import ErrorService from "../../services/error/error.service";
import { ERROR_TYPES } from "../../services/error/error.contsants";
import { ERROR_MESSAGES } from "./user.constants";
import UserDto from "./user.dto";

@singleton()
class UserModel implements IUserModel {
  static readonly token = "UserModel";

  private _model = model<IUser>(UserModel.token, userSchema);

  constructor(
    @inject(ErrorService.token) private _errorService: IErrorService,
  ) {}

  async create(payload: IUserCreatePayload): Promise<UserDto> {
    const created = await this._model.create(payload);
    return new UserDto(created._id, created.login);
  }

  async checkExistence(login: string): Promise<boolean> {
    const existed = await this._model.findOne({ login });

    if (existed) {
      this._errorService.throwForbidden(
        ERROR_TYPES.alreadyExist,
        ERROR_MESSAGES.alreadyExist,
      );
    }

    return true;
  }
}

export default {
  token: UserModel.token,
  useClass: UserModel,
};
