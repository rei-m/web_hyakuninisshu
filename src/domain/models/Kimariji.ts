import { toChineseChar } from '../utils/number';

const KIMARIJI_LIST = [1, 2, 3, 4, 5, 6];

/**
 * 決まり字
 */
export type Kimariji = typeof KIMARIJI_LIST[number];
export const Kimariji = {
  values: KIMARIJI_LIST as Array<Kimariji>,
  toJPNString: (value: Kimariji): string => `${toChineseChar(value)}字決まり`,
};
