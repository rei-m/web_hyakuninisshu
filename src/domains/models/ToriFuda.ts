import type { KarutaNo } from './KarutaNo';

/**
 * 取札
 */
export type ToriFuda = Readonly<{
  karutaNo: KarutaNo;
  shiku: string;
  kekku: string;
}>;
