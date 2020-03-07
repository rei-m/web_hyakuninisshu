import { Karuta } from '@src/domain/models';

export const MOCK_FIRST_KARUTA: Karuta = {
  id: '1',
  no: 1,
  imageNo: '001',
  kimariji: 1,
  color: 'blue',
  creator: '天智天皇',
  shoku: {
    kana: 'あきのたの',
    kanji: '秋の田の',
  },
  niku: {
    kana: 'かりほのいおの',
    kanji: 'かりほの庵の',
  },
  sanku: {
    kana: 'とまをあらみ',
    kanji: '苫をあらみ',
  },
  shiku: {
    kana: 'わがころもでは',
    kanji: 'わが衣手は',
  },
  kekku: {
    kana: 'きりにぬれつつ',
    kanji: '露にぬれつつ',
  },
  translation:
    '秋の田の側につくった仮小屋に泊まってみると、屋根をふいた苫の目があらいので、その隙間から忍びこむ冷たい夜露が、私の着物の袖をすっかりと濡らしてしまっているなぁ。',
};

export const MOCK_ALL_KARUTA_LIST: Array<Karuta> = [...Array(100).keys()].map(i => {
  return {
    ...MOCK_FIRST_KARUTA,
    id: String(i + 1),
    no: i + 1,
  };
});
