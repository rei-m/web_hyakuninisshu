import { toChineseChar } from '../utils/number';

export const KARUTA_NO_MIN = 1 as KarutaNo;
export const KARUTA_NO_MAX = 100 as KarutaNo;

/**
 * 歌番号
 */
export type KarutaNo = Brand<number, 'Karuta'>;

export const karutaNoToJPNText = ({ karutaNo }: { karutaNo: KarutaNo }) => `${toChineseChar(karutaNo)}番`;
