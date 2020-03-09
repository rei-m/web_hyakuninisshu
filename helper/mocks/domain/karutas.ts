import { Karuta, KarutaCollection } from '@src/domain/models';

export const MOCK_KARUTA_1: Karuta = {
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

export const MOCK_KARUTA_2: Karuta = {
  id: '2',
  no: 2,
  imageNo: '002',
  kimariji: 3,
  color: 'pink',
  creator: '持統天皇',
  shoku: {
    kana: 'はるすぎて',
    kanji: '春すぎて',
  },
  niku: {
    kana: 'なつきにけらし',
    kanji: '夏来にけらし',
  },
  sanku: {
    kana: 'しろたへの',
    kanji: '白妙の',
  },
  shiku: {
    kana: 'ころもほすてふ',
    kanji: '衣ほすてふ',
  },
  kekku: {
    kana: 'あまのかぐやま',
    kanji: '天の香具山',
  },
  translation:
    'もう春は過ぎ去り、いつのまにか夏が来てしまったようですね。香具山には、あんなにたくさんのまっ白な着物が干されているのですから。',
};

export const MOCK_KARUTA_3: Karuta = {
  id: '3',
  no: 3,
  imageNo: '003',
  kimariji: 2,
  color: 'yellow',
  creator: '柿本人麻呂',
  shoku: {
    kana: 'あしびきの',
    kanji: 'あしびきの',
  },
  niku: {
    kana: 'やまどりのをの',
    kanji: '山鳥の尾の',
  },
  sanku: {
    kana: 'しだりをの',
    kanji: 'しだり尾の',
  },
  shiku: {
    kana: 'ながながしよを',
    kanji: 'ながながし夜を',
  },
  kekku: {
    kana: 'ひとりかもねむ',
    kanji: 'ひとりかも寝む',
  },
  translation:
    '夜になると、雄と雌が離れて寝るという山鳥だが、その山鳥の長く垂れ下がった尾のように、こんなにも長い長い夜を、私もまた、(あなたと離れて)ひとり寂しく寝るのだろうか。',
};

export const MOCK_KARUTA_4: Karuta = {
  id: '4',
  no: 4,
  imageNo: '004',
  kimariji: 2,
  color: 'green',
  creator: '山部赤人',
  shoku: {
    kana: 'たごのうらに',
    kanji: '田子の浦に',
  },
  niku: {
    kana: 'うちいでてみれば',
    kanji: 'うち出でてみれば',
  },
  sanku: {
    kana: 'しろたへの',
    kanji: '白妙の',
  },
  shiku: {
    kana: 'ふじのたかねに',
    kanji: '富士のたかねに',
  },
  kekku: {
    kana: 'ゆきはふりつつ',
    kanji: '雪は降りつつ',
  },
  translation:
    '田子の浦の海岸に出てみると､雪をかぶったまっ白な富士の山が見事に見えるが、その高い峰には、今もしきりに雪がふり続けている。(あぁ、なんと素晴らしい景色なのだろう)',
};

export const MOCK_ALL_KARUTA_LIST: Array<Karuta> = [
  { ...MOCK_KARUTA_1 },
  { ...MOCK_KARUTA_1, id: '2', no: 2, kimariji: 2, color: 'pink' } as const,
  { ...MOCK_KARUTA_1, id: '3', no: 3, kimariji: 3, color: 'yellow' } as const,
  { ...MOCK_KARUTA_1, id: '4', no: 4, kimariji: 4, color: 'green' } as const,
  { ...MOCK_KARUTA_1, id: '5', no: 5, kimariji: 5, color: 'orange' } as const,
  { ...MOCK_KARUTA_1, id: '6', no: 6, kimariji: 6 } as const,
].concat(
  [...Array(94).keys()].map(i => {
    return {
      ...MOCK_KARUTA_1,
      id: String(i + 7),
      no: i + 7,
    };
  })
);

export const MOCK_KARUTA_COLLECTION: KarutaCollection = {
  karutaList: MOCK_ALL_KARUTA_LIST,
};
