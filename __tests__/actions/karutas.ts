import * as nock from 'nock';
import { mockAppStoreCreateor } from '../helpers';
import {
  fetchKarutas,
  FETCH_KARUTAS_NAME,
  KARUTA_JSON_URL,
  MY_GITHUB_ROOT,
  RAISE_KARUTAS_ERROR_NAME
} from '../../src/actions/karutas';
import { AppError, AppErrorType } from '../../src/errors';

const setUpGetSuccess = () => {
  nock(MY_GITHUB_ROOT)
    .get(KARUTA_JSON_URL)
    .reply(200, {
      karuta_list: [
        {
          color: 'pink',
          color_no: 16,
          creator: '天智天皇',
          fifth_kana: 'つゆにぬれつつ',
          fifth_kanji: '露にぬれつつ',
          first_kana: 'あきのたの',
          first_kanji: '秋の田の',
          fourth_kana: 'わがころもでは',
          fourth_kanji: 'わが衣手は',
          id: 1,
          image_no: '001',
          kimariji: 3,
          second_kana: 'かりほのいほの',
          second_kanji: 'かりほの庵の',
          third_kana: 'とまをあらみ',
          third_kanji: '苫をあらみ',
          translation:
            '秋の田の側につくった仮小屋に泊まってみると、屋根をふいた苫の目があらいので、その隙間から忍びこむ冷たい夜露が、私の着物の袖をすっかりと濡らしてしまっているなぁ。'
        }
      ]
    });
};

const setUpGetFailure = () => {
  nock(MY_GITHUB_ROOT)
    .get(KARUTA_JSON_URL)
    .reply(404);
};

describe('KarutasActionCreator', () => {
  it('should create FetchKarutasAction', () => {
    setUpGetSuccess();
    const store = mockAppStoreCreateor();
    return store.dispatch(fetchKarutas()).then(() => {
      const action = store.getActions()[0];
      const { type, payload } = action;
      expect(type).toEqual(FETCH_KARUTAS_NAME);
      expect(payload.karutas).toMatchObject([
        {
          color: 'pink',
          colorNo: 16,
          creator: '天智天皇',
          fifthKana: 'つゆにぬれつつ',
          fifthKanji: '露にぬれつつ',
          firstKana: 'あきのたの',
          firstKanji: '秋の田の',
          fourthKana: 'わがころもでは',
          fourthKanji: 'わが衣手は',
          id: 1,
          imageNo: '001',
          kimariji: 3,
          secondKana: 'かりほのいほの',
          secondKanji: 'かりほの庵の',
          thirdKana: 'とまをあらみ',
          thirdKanji: '苫をあらみ',
          translation:
            '秋の田の側につくった仮小屋に泊まってみると、屋根をふいた苫の目があらいので、その隙間から忍びこむ冷たい夜露が、私の着物の袖をすっかりと濡らしてしまっているなぁ。'
        }
      ]);
    });
  });

  it('should create RaiseKarutasErrorAction', () => {
    setUpGetFailure();
    const store = mockAppStoreCreateor();
    return store.dispatch(fetchKarutas()).then(() => {
      const action = store.getActions()[0];
      const { type, payload } = action;
      expect(type).toEqual(RAISE_KARUTAS_ERROR_NAME);
      expect(payload).toMatchObject(
        new AppError(
          '読み込みに失敗しました。通信状態の良いところでお試しください。',
          AppErrorType.Network
        )
      );
    });
  });
});
