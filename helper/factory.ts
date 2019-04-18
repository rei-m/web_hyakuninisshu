import { Answer, Karuta, Question, ToriFuda, YomiFuda } from '@src/types';

const initializerTree: { [key: string]: () => any } = {};
const idKeyTree: { [key: string]: string } = {};
const idHolder: { [key: string]: number } = {};

export const create = <T>(name: string, params: { [P in keyof T]?: T[P] } = {}): T => {
  const value = initializerTree[name]();
  if (value) {
    if (value.id) {
      const idKey = idKeyTree[name];
      const id = idHolder[idKey] ? idHolder[idKey] + 1 : 1;
      idHolder[idKey] = id;
      return { ...value, id, ...(params as any) };
    }
    return { ...value, ...(params as any) };
  }
  throw new Error(`${name}'s factory is not found`);
};

export const registerFactory = <T>(name: string, initializer: () => T, idKey?: string) => {
  initializerTree[name] = initializer;
  idKeyTree[name] = idKey ? idKey : name;
};

registerFactory<Karuta>('karuta', () => ({
  color: 'blue',
  creator: '天智天皇',
  fifthKana: 'きりにぬれつつ',
  fifthKanji: '露にぬれつつ',
  firstKana: 'あきのたの',
  firstKanji: '秋の田の',
  fourthKana: 'わがころもでは',
  fourthKanji: 'わが衣手は',
  id: '1',
  no: 1,
  imageNo: '001',
  kimariji: 1,
  secondKana: 'かりほのいおの',
  secondKanji: 'かりほの庵の',
  thirdKana: 'とまをあらみ',
  thirdKanji: '苫をあらみ',
  translation:
    '秋の田の側につくった仮小屋に泊まってみると、屋根をふいた苫の目があらいので、その隙間から忍びこむ冷たい夜露が、私の着物の袖をすっかりと濡らしてしまっているなぁ。',
}));

registerFactory<YomiFuda>('yomiFuda', () => ({
  firstText: '秋の田の',
  karutaNo: 1,
  questionId: 1,
  secondText: 'かりほの庵の',
  thirdText: '苫をあらみ',
}));

registerFactory<ToriFuda>('toriFuda', () => ({
  fifthText: 'きりにぬれつつ',
  fourthText: 'わがころもでは',
  karutaNo: 1,
  questionId: 1,
}));

registerFactory<Question>('question', () => ({
  correctKaruta: create<Karuta>('karuta', {
    no: 1,
  }),
  id: 1,
  toriFudas: [
    create<ToriFuda>('toriFuda', {
      karutaNo: 2,
    }),
    create<ToriFuda>('toriFuda', {
      karutaNo: 3,
    }),
    create<ToriFuda>('toriFuda', {
      karutaNo: 1,
    }),
    create<ToriFuda>('toriFuda', {
      karutaNo: 4,
    }),
  ],
  yomiFuda: create<YomiFuda>('yomiFuda', {
    karutaNo: 1,
  }),
}));

registerFactory<Answer>('answer', () => ({
  correct: true,
  karutaNo: 1,
  questionId: 1,
  time: 1000000,
}));
