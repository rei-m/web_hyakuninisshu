import { Action } from 'redux';
import { Color, Kimariji } from '@src/types';
import * as constants from './constants';

export type OPEN_KARUTAS_FILTER_TYPE = typeof constants.OPEN_KARUTAS_FILTER_NAME;

export type CLOSE_KARUTAS_FILTER_TYPE = typeof constants.CLOSE_KARUTAS_FILTER_NAME;

export type TOGGLE_KARUTAS_COLOR_TYPE = typeof constants.TOGGLE_KARUTAS_COLOR_NAME;

export type TOGGLE_KARUTAS_KIMARIJI_TYPE = typeof constants.TOGGLE_KARUTAS_KIMARIJI_NAME;

export interface OpenKarutasFilterAction extends Action {
  readonly type: OPEN_KARUTAS_FILTER_TYPE;
}

export interface CloseKarutasFilterAction extends Action {
  readonly type: CLOSE_KARUTAS_FILTER_TYPE;
}

export interface OKarutasFilterAction extends Action {
  readonly type: OPEN_KARUTAS_FILTER_TYPE;
}

export interface ToggleKarutasColorAction extends Action {
  readonly type: TOGGLE_KARUTAS_COLOR_TYPE;
  readonly payload: {
    readonly color: Color;
    readonly checked: boolean;
  };
}

export interface ToggleKarutasKimarijiAction extends Action {
  readonly type: TOGGLE_KARUTAS_KIMARIJI_TYPE;
  readonly payload: {
    readonly kimariji: Kimariji;
    readonly checked: boolean;
  };
}

export type Actions =
  | OpenKarutasFilterAction
  | CloseKarutasFilterAction
  | ToggleKarutasColorAction
  | ToggleKarutasKimarijiAction;

export interface KarutasFilter {
  readonly colors: Array<{ color: Color; checked: boolean }>;
  readonly kimarijis: Array<{ kimariji: Kimariji; checked: boolean }>;
}

export interface UiState {
  readonly karutasFilter: KarutasFilter & { readonly open: boolean };
}
