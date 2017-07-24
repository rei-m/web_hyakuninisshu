import { FetchKarutasAction } from '../../actions/karuta';
import { KarutaState } from './';

export default function fetchKarutasReducer(state: KarutaState, action: FetchKarutasAction): KarutaState {
  return {
    karutas: action.payload.karutas,
  };
}
