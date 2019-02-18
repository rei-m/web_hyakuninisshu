import { Action } from 'redux';
import { Color, Kimariji } from '@src/types';

export const OPEN_KARUTAS_FILTER_NAME = 'OPEN_KARUTAS_FILTER';
export type OPEN_KARUTAS_FILTER_TYPE = typeof OPEN_KARUTAS_FILTER_NAME;

export const CLOSE_KARUTAS_FILTER_NAME = 'CLOSE_KARUTAS_FILTER';
export type CLOSE_KARUTAS_FILTER_TYPE = typeof CLOSE_KARUTAS_FILTER_NAME;

export const TOGGLE_KARUTAS_COLOR_NAME = 'TOGGLE_KARUTAS_COLOR';
export type TOGGLE_KARUTAS_COLOR_TYPE = typeof TOGGLE_KARUTAS_COLOR_NAME;

export const TOGGLE_KARUTAS_KIMARIJI_NAME = 'TOGGLE_KARUTAS_KIMARIJI_NAME';
export type TOGGLE_KARUTAS_KIMARIJI_TYPE = typeof TOGGLE_KARUTAS_KIMARIJI_NAME;

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
