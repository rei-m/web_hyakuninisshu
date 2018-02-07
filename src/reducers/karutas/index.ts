import { FETCH_KARUTAS_NAME, KarutaActions } from '../../actions/karutas';
import { Karuta } from '../../types';
import fetchKarutasReducer from './fetchKarutaReducer';

export interface KarutaState {
  readonly karutas: Karuta[];
}

const initialState: KarutaState = {
  karutas: []
};

export default function karuta(
  state = initialState,
  action: KarutaActions
): KarutaState {
  switch (action.type) {
    case FETCH_KARUTAS_NAME:
      return fetchKarutasReducer(state, action);
    default:
      return state;
  }
}
