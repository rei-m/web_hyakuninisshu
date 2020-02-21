import { AppError } from './';

describe('errors', () => {
  it('should create AppError', () => {
    const actual = new AppError('test', 'Network');
    expect(actual.message).toBe('test');
    expect(actual.type).toBe('Network');
    expect(actual.name).toBe('AppError');
    expect(actual.toString()).toBe('AppError: test');
  });
});
