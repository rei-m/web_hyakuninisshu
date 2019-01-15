import { Action, Dispatch } from 'redux';
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

export type UiActions =
  | OpenKarutasFilterAction
  | CloseKarutasFilterAction
  | ToggleKarutasColorAction
  | ToggleKarutasKimarijiAction;

/*
 * action creators
 */
export const openKarutasFilter = () => (dispatch: Dispatch<OpenKarutasFilterAction>) =>
  dispatch({
    type: OPEN_KARUTAS_FILTER_NAME,
  });

export const closeKarutasFilter = () => (dispatch: Dispatch<CloseKarutasFilterAction>) =>
  dispatch({
    type: CLOSE_KARUTAS_FILTER_NAME,
  });

export const toggleKarutasColor = (color: Color, checked: boolean) => (
  dispatch: Dispatch<ToggleKarutasColorAction>
) => {
  const action: ToggleKarutasColorAction = {
    payload: {
      color,
      checked,
    },
    type: TOGGLE_KARUTAS_COLOR_NAME,
  };

  dispatch(action);
};

export const toggleKarutasKimariji = (kimariji: Kimariji, checked: boolean) => (
  dispatch: Dispatch<ToggleKarutasKimarijiAction>
) => {
  const action: ToggleKarutasKimarijiAction = {
    payload: {
      kimariji,
      checked,
    },
    type: TOGGLE_KARUTAS_KIMARIJI_NAME,
  };

  dispatch(action);
};
