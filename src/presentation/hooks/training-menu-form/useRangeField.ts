import { useFormField } from '../useFormField';
import { RangeFromCondition, RangeToCondition } from '@src/state/questions/types';

type Value = { from: RangeFromCondition; to: RangeToCondition };

const validate = ({ from, to }: Value) => {
  if (to < from) {
    return '出題範囲の始まりは終わりより小さい数を指定してください';
  }
  return undefined;
};

export const useRangeField = (initialValue: Value) => useFormField<Value>(initialValue, validate);
