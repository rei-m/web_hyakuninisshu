import { ActionCreatorImpl } from './actions';
import { ActionCreator } from './types';
import {
  CLOSE_KARUTAS_FILTER_NAME,
  OPEN_KARUTAS_FILTER_NAME,
  TOGGLE_KARUTAS_COLOR_NAME,
  TOGGLE_KARUTAS_KIMARIJI_NAME,
} from '@src/state/ui/constants';

describe('state/ui/actions/ActionCreator', () => {
  let actionCreator: ActionCreator;

  beforeEach(() => {
    actionCreator = new ActionCreatorImpl();
  });

  it('should create OpenKarutasFilterAction', () => {
    const actualAction = actionCreator.openKarutasFilter();
    expect(actualAction.type).toEqual(OPEN_KARUTAS_FILTER_NAME);
  });

  it('should create CloseKarutasFilterAction', () => {
    const actualAction = actionCreator.closeKarutasFilter();
    expect(actualAction.type).toEqual(CLOSE_KARUTAS_FILTER_NAME);
  });

  it('should create ToggleKarutasColorAction', () => {
    const actualAction = actionCreator.toggleKarutasColor('blue', true);
    expect(actualAction.type).toEqual(TOGGLE_KARUTAS_COLOR_NAME);
    expect(actualAction.payload).toEqual({ color: 'blue', checked: true });
  });

  it('should create ToggleKarutasKimarijiAction', () => {
    const actualAction = actionCreator.toggleKarutasKimariji(1, true);
    expect(actualAction.type).toEqual(TOGGLE_KARUTAS_KIMARIJI_NAME);
    expect(actualAction.payload).toEqual({ kimariji: 1, checked: true });
  });
});
