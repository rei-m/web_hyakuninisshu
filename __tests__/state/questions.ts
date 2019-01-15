import {
  CloseKarutasFilterAction,
  CLOSE_KARUTAS_FILTER_NAME,
  OpenKarutasFilterAction,
  OPEN_KARUTAS_FILTER_NAME,
  ToggleKarutasColorAction,
  ToggleKarutasKimarijiAction,
  TOGGLE_KARUTAS_COLOR_NAME,
  TOGGLE_KARUTAS_KIMARIJI_NAME,
} from '@src/actions/ui';
import { initialState, ui } from '@src/state/ui';

describe('Ui Logic', () => {
  it('should be transition state that is opened karutas filter', () => {
    const action: OpenKarutasFilterAction = {
      type: OPEN_KARUTAS_FILTER_NAME,
    };
    const state = ui(initialState, action);
    expect(state.karutasFilter.open).toBeTruthy();
  });

  it('should be transition state that is closed karutas filter', () => {
    const action: CloseKarutasFilterAction = {
      type: CLOSE_KARUTAS_FILTER_NAME,
    };
    const state = ui(initialState, action);
    expect(state.karutasFilter.open).toBeFalsy();
  });

  it('should be transition state that is toggled karutas kimariji', () => {
    const action: ToggleKarutasKimarijiAction = {
      type: TOGGLE_KARUTAS_KIMARIJI_NAME,
      payload: {
        kimariji: 1,
        checked: false,
      },
    };
    const state = ui(initialState, action);
    expect(state.karutasFilter.kimarijis.find(({ kimariji }) => kimariji === 1)).toEqual({
      kimariji: 1,
      checked: false,
    });
  });

  it('should be transition state that is toggled karutas color', () => {
    const action: ToggleKarutasColorAction = {
      type: TOGGLE_KARUTAS_COLOR_NAME,
      payload: {
        color: 'blue',
        checked: false,
      },
    };
    const state = ui(initialState, action);
    expect(state.karutasFilter.colors.find(({ color }) => color === 'blue')).toEqual({ color: 'blue', checked: false });
  });
});
