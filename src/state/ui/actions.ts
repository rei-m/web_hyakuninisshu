import { Color, Kimariji } from '@src/types';
import * as types from './types';
import * as constants from './constants';

export const openKarutasFilter = (): types.OpenKarutasFilterAction => ({
  type: constants.OPEN_KARUTAS_FILTER_NAME,
});

export const closeKarutasFilter = (): types.CloseKarutasFilterAction => ({
  type: constants.CLOSE_KARUTAS_FILTER_NAME,
});

export const toggleKarutasColor = (color: Color, checked: boolean): types.ToggleKarutasColorAction => ({
  payload: {
    color,
    checked,
  },
  type: constants.TOGGLE_KARUTAS_COLOR_NAME,
});

export const toggleKarutasKimariji = (kimariji: Kimariji, checked: boolean): types.ToggleKarutasKimarijiAction => ({
  payload: {
    kimariji,
    checked,
  },
  type: constants.TOGGLE_KARUTAS_KIMARIJI_NAME,
});
