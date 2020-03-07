import * as types from './types';
import * as constants from './constants';
import { Color, Kimariji } from '@src/domain/models';

export class ActionCreatorImpl implements types.ActionCreator {
  openKarutasFilter(): types.OpenKarutasFilterAction {
    return {
      type: constants.OPEN_KARUTAS_FILTER_NAME,
    };
  }

  closeKarutasFilter(): types.CloseKarutasFilterAction {
    return {
      type: constants.CLOSE_KARUTAS_FILTER_NAME,
    };
  }

  toggleKarutasColor(color: Color, checked: boolean): types.ToggleKarutasColorAction {
    return {
      payload: {
        color,
        checked,
      },
      type: constants.TOGGLE_KARUTAS_COLOR_NAME,
    };
  }

  toggleKarutasKimariji(kimariji: Kimariji, checked: boolean): types.ToggleKarutasKimarijiAction {
    return {
      payload: {
        kimariji,
        checked,
      },
      type: constants.TOGGLE_KARUTAS_KIMARIJI_NAME,
    };
  }
}
