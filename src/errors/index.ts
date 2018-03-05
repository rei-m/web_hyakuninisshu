export enum AppErrorType {
  Network,
  Unknown
}

export const UNKNOWN_MESSAGE =
  '予期せぬエラーが発生しました。時間をおいて再度お試しください。';

export class AppError implements Error {
  private _message: string;
  private _type: AppErrorType;

  constructor(message: string, type: AppErrorType) {
    this._message = message;
    this._type = type;
  }

  public get name() {
    return 'AppError';
  }

  public get message() {
    return this._message;
  }

  public get type() {
    return this._type;
  }

  public toString() {
    return `${this.name}: ${this.message}`;
  }
}
