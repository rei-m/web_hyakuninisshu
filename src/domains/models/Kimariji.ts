import { toChineseChar } from '../utils/number';

export const KIMARIJI_LIST = [1, 2, 3, 4, 5, 6] as const;

/**
 * 決まり字
 */
export type Kimariji = (typeof KIMARIJI_LIST)[number];

export const kimarijiToJPNText = ({ kimariji }: { kimariji: Kimariji }) => `${toChineseChar(kimariji)}字決まり`;
