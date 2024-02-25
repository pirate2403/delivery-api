import { model, Types } from "mongoose";
import { inject, singleton } from "tsyringe";
import bind from "bind-decorator";
import { IUser, IUserCreatePayload, IUserModel } from "./user.interfaces";
import userSchema from "./user.schema";
import { IErrorService } from "../../services/error/error-service.interfaces";
import ErrorService from "../../services/error/error.service";

@singleton()
class UserModel implements IUserModel {
  static readonly token = "UserModel";

  private _model = model<IUser>(UserModel.token, userSchema);

  constructor(
    @inject(ErrorService.token) private _errorService: IErrorService,
  ) {}

  @bind
  private _parseUserByQuery(query: IUser & { _id: Types.ObjectId }): IUser {
    return {
      id: query._id,
      login: query.login,
      password: query.password,
    };
  }

  @bind
  parseUserFromExtendedUserData(data: IUser & { [k: string]: unknown }): IUser {
    return {
      id: data.id,
      login: data.login,
      password: data.password,
    };
  }

  @bind
  async create(payload: IUserCreatePayload): Promise<IUser> {
    return this._parseUserByQuery(await this._model.create(payload));
  }

  @bind
  async remove(login: string): Promise<void> {
    await this._model.deleteOne({ login });
  }

  @bind
  async getUserByLogin(login: string): Promise<IUser | null> {
    const found = await this._model.findOne({ login });
    return found ? this._parseUserByQuery(found) : null;
  }
}

export default {
  token: UserModel.token,
  useClass: UserModel,
};
