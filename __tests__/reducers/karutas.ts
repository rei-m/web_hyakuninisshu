import { create } from '../factories';
import {
  FetchKarutasAction,
  FETCH_KARUTAS_NAME,
  RaiseKarutasErrorAction,
  RAISE_KARUTAS_ERROR_NAME
} from '@src/actions/karutas';
import { initialState, karutasReducer } from '@src/reducers/karutas';
import { AppError, AppErrorType } from '@src/errors';
import { Karuta } from '@src/types';

describe('Karutas Logic', () => {
  it('should fetch karutas', () => {
    const action: FetchKarutasAction = {
      error: false,
      payload: {
        karutas: [create<Karuta>('karuta'), create<Karuta>('karuta')]
      },
      type: FETCH_KARUTAS_NAME
    };
    const state = karutasReducer(initialState, action);
    expect(state.karutas).toHaveLength(2);
    expect(state.karutas[0]).toEqual(action.payload.karutas[0]);
  });

  it('should raise error', () => {
    const action: RaiseKarutasErrorAction = {
      error: true,
      payload: new AppError('test', AppErrorType.Network),
      type: RAISE_KARUTAS_ERROR_NAME
    };
    const state = karutasReducer(initialState, action);
    expect(state.karutas).toHaveLength(0);
    expect(state.error).toEqual(action.payload);
  });
});
