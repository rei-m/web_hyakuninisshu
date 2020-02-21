import { RouteComponentProps } from '@reach/router';

export type SiteMetaData = {
  title: string;
  description: string;
  author: string;
};

export type GeneratedPageComponentProps<T = {}> = { pageContext: T } & RouteComponentProps<T>;

export type AppErrorType = 'Network' | 'NotFound' | 'Unknown';

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
