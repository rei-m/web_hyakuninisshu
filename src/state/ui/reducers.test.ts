import { uiReducer, uiTypes } from '@src/state/ui';
import { initialState } from '@src/state/ui/reducers';
import * as constants from '@src/state/ui/constants';

describe('UiReducer', () => {
  it('should return next state when OpenKarutasFilterAction received', () => {
    const action: uiTypes.OpenKarutasFilterAction = {
      type: constants.OPEN_KARUTAS_FILTER_NAME,
    };
    const state = uiReducer(initialState, action);
    expect(state.karutasFilter.open).toBeTruthy();
  });

  it('should return next state when CloseKarutasFilterAction received', () => {
    const action: uiTypes.CloseKarutasFilterAction = {
      type: constants.CLOSE_KARUTAS_FILTER_NAME,
    };
    const state = uiReducer(initialState, action);
    expect(state.karutasFilter.open).toBeFalsy();
  });

  it('should return next state when ToggleKarutasKimarijiAction received', () => {
    const action: uiTypes.ToggleKarutasKimarijiAction = {
      type: constants.TOGGLE_KARUTAS_KIMARIJI_NAME,
      payload: {
        kimariji: 1,
        checked: false,
      },
    };
    const state = uiReducer(initialState, action);
    expect(state.karutasFilter.kimarijis.find(({ kimariji }) => kimariji === 1)).toEqual({
      kimariji: 1,
      checked: false,
    });
  });

  it('should return next state when ToggleKarutasColorAction received', () => {
    const action: uiTypes.ToggleKarutasColorAction = {
      type: constants.TOGGLE_KARUTAS_COLOR_NAME,
      payload: {
        color: 'blue',
        checked: false,
      },
    };
    const state = uiReducer(initialState, action);
    expect(state.karutasFilter.colors.find(({ color }) => color === 'blue')).toEqual({
      color: 'blue',
      checked: false,
    });
  });
});
