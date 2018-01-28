import { FetchKarutasAction } from '../../actions/karuta';
import { KarutaState } from './';

export default function fetchKarutasReducer(_state: KarutaState, action: FetchKarutasAction): KarutaState {
  return {
    karutas: action.payload.karutas,
  };
}
