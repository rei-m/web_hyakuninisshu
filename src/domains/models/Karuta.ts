import type { Kimariji } from './Kimariji';
import type { Color } from './Color';
import type { KarutaNo } from './KarutaNo';
import type { KarutaImageNo } from './KarutaImageNo';
import type { Ku } from './Ku';

/**
 * 百人一首の歌
 */
export type Karuta = Readonly<{
  no: KarutaNo; // 歌番号
  imageNo: KarutaImageNo; // 歌画像番号
  creator: string; // 作者
  shoku: Ku; // 初句
  niku: Ku; // 二句
  sanku: Ku; // 三句
  shiku: Ku; // 四句
  kekku: Ku; // 結句
  kimariji: Kimariji; // 決まり字
  color: Color; // 五色百人一首の色
  translation: string; // 訳文
}>;
