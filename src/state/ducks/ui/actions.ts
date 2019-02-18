import * as types from './types';
import { Color, Kimariji } from '@src/types';

export const openKarutasFilter = (): types.OpenKarutasFilterAction => ({
  type: types.OPEN_KARUTAS_FILTER_NAME,
});

export const closeKarutasFilter = (): types.CloseKarutasFilterAction => ({
  type: types.CLOSE_KARUTAS_FILTER_NAME,
});

export const toggleKarutasColor = (color: Color, checked: boolean): types.ToggleKarutasColorAction => ({
  payload: {
    color,
    checked,
  },
  type: types.TOGGLE_KARUTAS_COLOR_NAME,
});

export const toggleKarutasKimariji = (kimariji: Kimariji, checked: boolean): types.ToggleKarutasKimarijiAction => ({
  payload: {
    kimariji,
    checked,
  },
  type: types.TOGGLE_KARUTAS_KIMARIJI_NAME,
});
