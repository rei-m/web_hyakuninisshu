import { renderHook, act } from '@testing-library/react-hooks';
import { useFormField } from './useFormField';

describe('hooks', () => {
  describe('useFormField', () => {
    const _validate = (v: boolean) => {
      if (v === true) {
        return 'error';
      } else {
        return undefined;
      }
    };

    it('should return inital value', () => {
      const { result } = renderHook(() => useFormField<boolean>(false, _validate));
      const { value, error } = result.current;
      expect(value).toBeFalsy();
      expect(error).toBeUndefined();
    });

    it('should set new value and error', () => {
      const { result } = renderHook(() => useFormField<boolean>(false, _validate));
      act(() => {
        result.current.set(true);
      });
      expect(result.current.value).toBeTruthy();
      expect(result.current.error).toEqual('error');
    });

    it('should return error when validate called', () => {
      const { result } = renderHook(() => useFormField<boolean>(true, _validate));
      act(() => {
        const actual = result.current.validate();
        expect(actual).toEqual('error');
      });
      expect(result.current.error).toEqual('error');
    });
  });
});
