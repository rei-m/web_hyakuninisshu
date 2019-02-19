import { Dispatch } from 'redux';
import { Color, Kimariji } from '@src/types';
import * as actions from './actions';
import * as types from './types';

export const openKarutasFilter = () => (dispatch: Dispatch<types.OpenKarutasFilterAction>) =>
  dispatch(actions.openKarutasFilter());

export const closeKarutasFilter = () => (dispatch: Dispatch<types.CloseKarutasFilterAction>) =>
  dispatch(actions.closeKarutasFilter());

export const toggleKarutasColor = (color: Color, checked: boolean) => (
  dispatch: Dispatch<types.ToggleKarutasColorAction>
) => dispatch(actions.toggleKarutasColor(color, checked));

export const toggleKarutasKimariji = (kimariji: Kimariji, checked: boolean) => (
  dispatch: Dispatch<types.ToggleKarutasKimarijiAction>
) => dispatch(actions.toggleKarutasKimariji(kimariji, checked));
