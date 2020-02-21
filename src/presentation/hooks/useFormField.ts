import { useState, useCallback } from 'react';

export const useFormField = <T>(
  initialValue: T,
  _validate: (value: T) => string | undefined
): {
  value: T;
  error: string | undefined;
  set: (value: T) => void;
  validate: () => string | undefined;
} => {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string>();

  const set = useCallback((newValue: T) => {
    setValue(newValue);
    setError(_validate(newValue));
  }, []);

  const validate = useCallback(() => {
    const error = _validate(value);
    setError(error);
    return error;
  }, [value]);

  return { value, error, set, validate };
};
