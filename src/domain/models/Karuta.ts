import { Kimariji } from './Kimariji';
import { Color } from './Color';
import { KarutaId } from './KarutaId';
import { KarutaNo } from './KarutaNo';
import { KarutaImageNo } from './KarutaImageNo';
import { Ku } from './Ku';

export type Karuta = Readonly<{
  id: KarutaId;
  no: KarutaNo;
  imageNo: KarutaImageNo;
  creator: string;
  shoku: Ku;
  niku: Ku;
  sanku: Ku;
  shiku: Ku;
  kekku: Ku;
  kimariji: Kimariji;
  color: Color;
  translation: string;
}>;
