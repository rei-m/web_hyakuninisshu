import {
  FETCH_KARUTAS_NAME,
  KarutaActions,
  RAISE_KARUTAS_ERROR_NAME
} from '../actions/karutas';
import { Karuta } from '../types';
import { AppError } from '../errors';

export interface KarutasState {
  readonly karutas: Karuta[];
  readonly error?: AppError;
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
    case RAISE_KARUTAS_ERROR_NAME:
      return {
        error: action.payload,
        karutas: []
      };
    default:
      return state;
  }
};

export default karutasReducer;
