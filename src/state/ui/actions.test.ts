import * as uiActions from '@src/state/ui/actions';
import {
  CLOSE_KARUTAS_FILTER_NAME,
  OPEN_KARUTAS_FILTER_NAME,
  TOGGLE_KARUTAS_COLOR_NAME,
  TOGGLE_KARUTAS_KIMARIJI_NAME,
} from '@src/state/ui/constants';

describe('UiActionCreator', () => {
  it('should create OpenKarutasFilterAction', () => {
    const actualAction = uiActions.openKarutasFilter();
    expect(actualAction.type).toEqual(OPEN_KARUTAS_FILTER_NAME);
  });

  it('should create CloseKarutasFilterAction', () => {
    const actualAction = uiActions.closeKarutasFilter();
    expect(actualAction.type).toEqual(CLOSE_KARUTAS_FILTER_NAME);
  });

  it('should create ToggleKarutasColorAction', () => {
    const actualAction = uiActions.toggleKarutasColor('blue', true);
    expect(actualAction.type).toEqual(TOGGLE_KARUTAS_COLOR_NAME);
    expect(actualAction.payload).toEqual({ color: 'blue', checked: true });
  });

  it('should create ToggleKarutasKimarijiAction', () => {
    const actualAction = uiActions.toggleKarutasKimariji(1, true);
    expect(actualAction.type).toEqual(TOGGLE_KARUTAS_KIMARIJI_NAME);
    expect(actualAction.payload).toEqual({ kimariji: 1, checked: true });
  });
});
