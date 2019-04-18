import { AppError, AppErrorType } from '@src/errors';

describe('errors', () => {
  it('should create AppError', () => {
    const actual = new AppError('test', AppErrorType.Network);
    expect(actual.message).toBe('test');
    expect(actual.type).toBe(AppErrorType.Network);
    expect(actual.name).toBe('AppError');
    expect(actual.toString()).toBe('AppError: test');
  });
});
