import { toChineseChar } from '../utils/number';
import { IllegalArgumentError } from '../errors';

/**
 * 決まり字
 */
export type Kimariji = 1 | 2 | 3 | 4 | 5 | 6;
export const Kimariji = {
  create: (value: number): Kimariji => {
    if ([1, 2, 3, 4, 5, 6].includes(value)) {
      return value as Kimariji;
    }
    throw new IllegalArgumentError(`value=${value}`);
  },
  values: [1, 2, 3, 4, 5, 6] as Array<Kimariji>,
  toJPNString: (value: Kimariji): string => `${toChineseChar(value)}字決まり`,
};
