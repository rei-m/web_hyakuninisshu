import {
  FETCH_KARUTAS_NAME,
  KarutaActions,
} from '../../actions/karuta';
import { Karuta } from '../../types';
import fetchKarutasReducer from './fetchKarutaReducer';

export interface KarutaState {
  readonly karutas: Karuta[];
}

const initialState = {
  karutas: [],
};

export default function karuta(state = initialState, action: KarutaActions): KarutaState {
  switch (action.type) {
    case FETCH_KARUTAS_NAME:
      return fetchKarutasReducer(state, action);
    default:
      return state;
  }
}
