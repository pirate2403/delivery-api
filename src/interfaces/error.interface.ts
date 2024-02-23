export interface IErrorBody {
  [k: string]: unknown;
}

export interface IError {
  status: number;
  message: string;
  body: IErrorBody;
}
