import { FETCH_KARUTAS_NAME, KarutaActions } from '../actions/karutas';
import { Karuta } from '../types';

export interface KarutasState {
  readonly karutas: Karuta[];
}

export const initialState: KarutasState = {
  karutas: []
};

const karutasReducer = (
  state = initialState,
  action: KarutaActions
): KarutasState => {
  switch (action.type) {
    case FETCH_KARUTAS_NAME:
      return {
        karutas: action.payload.karutas
      };
    default:
      return state;
  }
};

export default karutasReducer;
