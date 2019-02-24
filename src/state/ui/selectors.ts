import * as types from './types';
import { Color, Karuta, Kimariji } from '@src/types';

export const filterKarutas = (karutas: Karuta[], filter: types.KarutasFilter) => {
  const kimarijiSet = new Set<Kimariji>(filter.kimarijis.filter(k => k.checked).map(k => k.kimariji));
  const colorSet = new Set<Color>(filter.colors.filter(k => k.checked).map(k => k.color));
  return karutas.filter(karuta => kimarijiSet.has(karuta.kimariji) && colorSet.has(karuta.color));
};
