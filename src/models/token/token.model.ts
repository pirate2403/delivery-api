import { inject, singleton } from "tsyringe";
import { model, Types } from "mongoose";
import bind from "bind-decorator";
import { IToken, ITokenModel } from "./token.interfaces";
import ErrorService from "../../services/error/error.service";
import { IErrorService } from "../../services/error/error-service.interfaces";
import tokenSchema from "./token.schema";

@singleton()
class TokenModel implements ITokenModel {
  static readonly token = "TokenModel";

  private _model = model<IToken>(TokenModel.token, tokenSchema);

  constructor(
    @inject(ErrorService.token) private _errorService: IErrorService,
  ) {}

  @bind
  private _parseTokenByQuery(query: IToken & { _id: Types.ObjectId }): IToken {
    return {
      id: query._id,
      refreshToken: query.refreshToken,
      user: query.user,
    };
  }

  @bind
  async create(payload: any): Promise<IToken> {
    const created = await this._model.create(payload);
    return {
      id: created.id,
      user: created.user,
      refreshToken: created.refreshToken,
    };
  }

  @bind
  async remove(refreshToken: string): Promise<void> {
    this._model.deleteOne({ refreshToken });
  }

  @bind
  async findByToken(refreshToken: string): Promise<IToken | null> {
    const found = await this._model.findOne({ refreshToken });
    return found ? this._parseTokenByQuery(found) : null;
  }
}

export default {
  token: TokenModel.token,
  useClass: TokenModel,
};
