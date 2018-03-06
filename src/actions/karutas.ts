import * as fetch from 'isomorphic-fetch';
import { Action, Dispatch } from 'redux';
import { GlobalState } from '../reducers';
import { Karuta } from '../types';
import { AppError, AppErrorType } from '../errors';
import { convertCamelKey } from '../utils';

// TODO: あとで差し替え
export const MY_GITHUB_ROOT = 'https://raw.githubusercontent.com/rei-m';
export const KARUTA_JSON_URL =
  '/android_hyakuninisshu/master/app/src/main/assets/karuta_list.json';

export const FETCH_KARUTAS_NAME = 'FETCH_KARUTAS_NAME';
export type FETCH_KARUTAS_TYPE = typeof FETCH_KARUTAS_NAME;

export const RAISE_KARUTAS_ERROR_NAME = 'RAISE_KARUTAS_ERROR_NAME';
export type RAISE_KARUTAS_ERROR_TYPE = typeof RAISE_KARUTAS_ERROR_NAME;

export interface FetchKarutasAction extends Action {
  type: FETCH_KARUTAS_TYPE;
  payload: {
    karutas: Karuta[];
  };
  error: false;
}

export interface RaiseKarutasErrorAction extends Action {
  type: RAISE_KARUTAS_ERROR_TYPE;
  payload: AppError;
  error: true;
}

export type KarutaActions = FetchKarutasAction | RaiseKarutasErrorAction;

/*
 * action creators
 */
export const fetchKarutas = () => {
  return async (dispatch: Dispatch<GlobalState>) => {
    const response = await fetch(MY_GITHUB_ROOT + KARUTA_JSON_URL);
    if (response.status === 200) {
      const json = await response.json();
      const data = convertCamelKey(json) as { karutaList: Karuta[] };
      const karutas = data.karutaList;
      dispatch({
        error: false,
        payload: { karutas },
        type: FETCH_KARUTAS_NAME
      });
    } else {
      dispatch({
        error: true,
        payload: new AppError(
          '読み込みに失敗しました。通信状態の良いところでお試しください。',
          AppErrorType.Network
        ),
        type: RAISE_KARUTAS_ERROR_NAME
      });
    }
  };
};
