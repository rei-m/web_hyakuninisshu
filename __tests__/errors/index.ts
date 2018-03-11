import { AppError, AppErrorType } from '../../src/errors';

describe('errors', () => {
  it('should create AppError', () => {
    const actual = new AppError('test', AppErrorType.Network);
    expect(actual.message).toEqual('test');
    expect(actual.type).toEqual(AppErrorType.Network);
  });
});
