import { Action } from 'redux';
import * as constants from './constants';
import { Color, Kimariji } from '@src/domain/models';
import { Payload } from '..';

export type KarutasFilter = Readonly<{
  colors: Array<{ color: Color; checked: boolean }>;
  kimarijis: Array<{ kimariji: Kimariji; checked: boolean }>;
}>;

export type OpenKarutasFilterAction = Action<typeof constants.OPEN_KARUTAS_FILTER_NAME>;

export type CloseKarutasFilterAction = Action<typeof constants.CLOSE_KARUTAS_FILTER_NAME>;

export type ToggleKarutasColorAction = Action<typeof constants.TOGGLE_KARUTAS_COLOR_NAME> &
  Payload<{
    color: Color;
    checked: boolean;
  }>;

export type ToggleKarutasKimarijiAction = Action<typeof constants.TOGGLE_KARUTAS_KIMARIJI_NAME> &
  Payload<{
    kimariji: Kimariji;
    checked: boolean;
  }>;

export type Actions =
  | OpenKarutasFilterAction
  | CloseKarutasFilterAction
  | ToggleKarutasColorAction
  | ToggleKarutasKimarijiAction;

export type ActionCreator = {
  /**
   * OpenKarutasFilterActionを返す
   *
   * @returns {OpenKarutasFilterAction}
   */
  openKarutasFilter: () => OpenKarutasFilterAction;

  /**
   * CloseKarutasFilterActionを返す
   *
   * @returns {CloseKarutasFilterAction}
   */
  closeKarutasFilter: () => CloseKarutasFilterAction;

  /**
   * ToggleKarutasColorActionを返す
   *
   * @param color 歌の色
   * @param checked 表示する/しない
   *
   * @returns {ToggleKarutasColorAction}
   */
  toggleKarutasColor: (color: Color, checked: boolean) => ToggleKarutasColorAction;

  /**
   * ToggleKarutasKimarijiActionを返す
   *
   * @param kimariji 歌の決まり字
   * @param checked 表示する/しない
   *
   * @returns {ToggleKarutasKimarijiAction}
   */
  toggleKarutasKimariji: (kimariji: Kimariji, checked: boolean) => ToggleKarutasKimarijiAction;
};

export type State = Readonly<{
  karutasFilter: KarutasFilter & { open: boolean };
}>;
