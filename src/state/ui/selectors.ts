import * as types from './types';
import { Karuta, KarutaCollection, KarutaNo } from '@src/domain/models';

export const filterKarutas = (
  karutaCollection: KarutaCollection,
  filter: types.KarutasFilter
): ReadonlyArray<Karuta> => {
  const range = { from: KarutaNo.MIN_VALUE, to: KarutaNo.MAX_VALUE };
  const kimarijiList = filter.kimarijis.filter((k) => k.checked).map((k) => k.kimariji);
  const colorList = filter.colors.filter((k) => k.checked).map((k) => k.color);
  return KarutaCollection.select(karutaCollection, { range, kimarijiList, colorList });
};
