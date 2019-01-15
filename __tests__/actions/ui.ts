import { mockAppStoreCreateor } from '@test/helpers';
import * as uiAction from '@src/actions/ui';
import { initialState as questionsInitialState } from '@src/state/questions';
import { initialState as uiInitialState } from '@src/state/ui';

const setUpStore = () =>
  mockAppStoreCreateor()({
    questions: questionsInitialState,
    ui: uiInitialState,
  });

describe('UiActionCreator', () => {
  it('should create OpenKarutasFilterAction', () => {
    const actionCreator = uiAction.openKarutasFilter();
    const store = setUpStore();
    store.dispatch(actionCreator as any);
    const action = store.getActions()[0] as uiAction.OpenKarutasFilterAction;
    expect(action.type).toEqual(uiAction.OPEN_KARUTAS_FILTER_NAME);
  });

  it('should create CloseKarutasFilterAction', () => {
    const actionCreator = uiAction.closeKarutasFilter();
    const store = setUpStore();
    store.dispatch(actionCreator as any);
    const action = store.getActions()[0] as uiAction.CloseKarutasFilterAction;
    expect(action.type).toEqual(uiAction.CLOSE_KARUTAS_FILTER_NAME);
  });

  it('should create ToggleKarutasColorAction', () => {
    const actionCreator = uiAction.toggleKarutasColor('blue', true);
    const store = setUpStore();
    store.dispatch(actionCreator as any);
    const action = store.getActions()[0] as uiAction.ToggleKarutasColorAction;
    expect(action.type).toEqual(uiAction.TOGGLE_KARUTAS_COLOR_NAME);
    expect(action.payload).toEqual({ color: 'blue', checked: true });
  });

  it('should create ToggleKarutasKimarijiAction', () => {
    const actionCreator = uiAction.toggleKarutasKimariji(1, true);
    const store = setUpStore();
    store.dispatch(actionCreator as any);
    const action = store.getActions()[0] as uiAction.ToggleKarutasKimarijiAction;
    expect(action.type).toEqual(uiAction.TOGGLE_KARUTAS_KIMARIJI_NAME);
    expect(action.payload).toEqual({ kimariji: 1, checked: true });
  });
});
