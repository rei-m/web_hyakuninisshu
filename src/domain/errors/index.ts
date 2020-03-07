class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class IllegalArgumentError extends BaseError {}
export class IllegalStateError extends BaseError {}
export class NoSuchElementError extends BaseError {}
