import { uiReducer, uiTypes } from '@src/state/ui';
import { initialState } from '@src/state/ui/reducers';
import * as uiConstants from '@src/state/ui/constants';

describe('UiReducer', () => {
  it('should be transition state that is opened karutas filter', () => {
    const action: uiTypes.OpenKarutasFilterAction = {
      type: uiConstants.OPEN_KARUTAS_FILTER_NAME,
    };
    const state = uiReducer(initialState, action);
    expect(state.karutasFilter.open).toBeTruthy();
  });

  it('should be transition state that is closed karutas filter', () => {
    const action: uiTypes.CloseKarutasFilterAction = {
      type: uiConstants.CLOSE_KARUTAS_FILTER_NAME,
    };
    const state = uiReducer(initialState, action);
    expect(state.karutasFilter.open).toBeFalsy();
  });

  it('should be transition state that is toggled karutas kimariji', () => {
    const action: uiTypes.ToggleKarutasKimarijiAction = {
      type: uiConstants.TOGGLE_KARUTAS_KIMARIJI_NAME,
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

  it('should be transition state that is toggled karutas color', () => {
    const action: uiTypes.ToggleKarutasColorAction = {
      type: uiConstants.TOGGLE_KARUTAS_COLOR_NAME,
      payload: {
        color: 'blue',
        checked: false,
      },
    };
    const state = uiReducer(initialState, action);
    expect(state.karutasFilter.colors.find(({ color }) => color === 'blue')).toEqual({ color: 'blue', checked: false });
  });
});
