import { toChineseChar } from '../utils/number';
import { IllegalArgumentError } from '../errors';

const MIN_VALUE = 1;
const MAX_VALUE = 100;

/**
 * 歌番号
 */
export type KarutaNo = number;
export const KarutaNo = {
  MIN_VALUE: MIN_VALUE,
  MAX_VALUE: MAX_VALUE,
  LIST: Array.from({ length: MAX_VALUE }).map((_, i) => i + 1),
  create: (value: number): KarutaNo => {
    if (MIN_VALUE <= value && value <= MAX_VALUE) {
      return value as KarutaNo;
    }
    throw new IllegalArgumentError(`value=${value}`);
  },
  toJPNString: (value: KarutaNo): string => `${toChineseChar(value)}番`,
};
