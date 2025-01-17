import type { KarutaNo } from './KarutaNo';

/**
 * 読み札
 */
export type YomiFuda = Readonly<{
  karutaNo: KarutaNo;
  shoku: string;
  niku: string;
  sanku: string;
}>;
