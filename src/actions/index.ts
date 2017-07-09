import * as fetch from 'isomorphic-fetch';
import { Action, Dispatch } from 'redux';
import Karuta from '../types/Karuta';
import { convertCamelKey } from '../util';

const MY_GITHUB_ROOT = 'https://raw.githubusercontent.com/rei-m/';
const KARUTA_JSON_URL = 'android_hyakuninisshu/master/app/src/main/assets/karuta_list.json';

export const COMPLETE_PREPARE_APPLICATION_NAME = 'COMPLETE_PREPARE_APPLICATION';
export type COMPLETE_PREPARE_APPLICATION_TYPE = typeof COMPLETE_PREPARE_APPLICATION_NAME;

export interface CompletePrepareApplicationAction extends Action {
  type: COMPLETE_PREPARE_APPLICATION_TYPE;
  payload: {
    karutaList: Karuta[],
  };
}

// {type: FOO_TYPE,      // must
// payload: {object},   // optional
// meta: {object},      // optional
// error: false, true, undefined, null, ... // optional

// TODO: 後でfetchやめてasync/awaitにする
/*
 * action creators
 */
export function startApplication() {
  return (dispatch: Dispatch<CompletePrepareApplicationAction>) => {
    fetch(MY_GITHUB_ROOT + KARUTA_JSON_URL).then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then((response) => {
      dispatch({
        payload: convertCamelKey(response),
        type: COMPLETE_PREPARE_APPLICATION_NAME,
      });
    });
  };
}
