import * as fetch from 'isomorphic-fetch';
import { Action, Dispatch } from 'redux';
import { Karuta } from '../../types';
import { convertCamelKey } from '../../util';

const MY_GITHUB_ROOT = 'https://raw.githubusercontent.com/rei-m/';
const KARUTA_JSON_URL = 'android_hyakuninisshu/master/app/src/main/assets/karuta_list.json';

export const FETCH_KARUTAS_NAME = 'FETCH_KARUTAS_NAME';
export type FETCH_KARUTAS_TYPE = typeof FETCH_KARUTAS_NAME;

export interface FetchKarutasAction extends Action {
  type: FETCH_KARUTAS_TYPE;
  payload: {
    karutas: Karuta[],
  };
  error: boolean;
}
// meta: {object},      // optional

export type KarutaActions = FetchKarutasAction;

/*
 * action creators
 */
export function fetchKarutas() {
  return async (dispatch: Dispatch<FetchKarutasAction>) => {
    const response = await fetch(MY_GITHUB_ROOT + KARUTA_JSON_URL);
    let error = true;
    let karutas: Karuta[] = [];
    if (response.status === 200) {
      const json = await response.json();
      const data = convertCamelKey(json) as { karutaList: Karuta[] };
      karutas = data.karutaList;
      error = false;
    }
    dispatch({
      error,
      payload: { karutas },
      type: FETCH_KARUTAS_NAME,
    });
  };
}
