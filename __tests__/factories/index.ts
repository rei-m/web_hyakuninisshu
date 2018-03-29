import { Answer, Karuta, Question, ToriFuda, YomiFuda } from '../../src/types';

const initializerTree: { [key: string]: () => any } = {};
const idKeyTree: { [key: string]: string } = {};
const idHolder: { [key: string]: number } = {};

export const create = <T>(
  name: string,
  params: { [P in keyof T]?: T[P] } = {}
): T => {
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

export const registerFactory = <T>(
  name: string,
  initializer: () => T,
  idKey?: string
) => {
  initializerTree[name] = initializer;
  idKeyTree[name] = idKey ? idKey : name;
};

registerFactory<Karuta>('karuta', () => ({
  color: 'blue',
  creator: '詠み手',
  fifthKana: 'ごく',
  fifthKanji: '五句',
  firstKana: 'しょく',
  firstKanji: '初句',
  fourthKana: 'よんく',
  fourthKanji: '四句',
  id: 1,
  imageNo: '001',
  kimariji: 1,
  secondKana: 'にく',
  secondKanji: '二句',
  thirdKana: 'さんく',
  thirdKanji: '三句',
  translation: '歌の訳'
}));

registerFactory<YomiFuda>('yomiFuda', () => ({
  firstText: '初句',
  karutaId: 1,
  questionId: 1,
  secondText: '二句',
  thirdText: '三句'
}));

registerFactory<ToriFuda>('toriFuda', () => ({
  fifthText: 'ごく',
  fourthText: 'よんく',
  karutaId: 1,
  questionId: 1
}));

registerFactory<Question>('question', () => ({
  correctKaruta: create<Karuta>('karuta', {
    id: 1
  }),
  id: 1,
  toriFudas: [
    create<ToriFuda>('toriFuda', {
      karutaId: 2
    }),
    create<ToriFuda>('toriFuda', {
      karutaId: 3
    }),
    create<ToriFuda>('toriFuda', {
      karutaId: 1
    }),
    create<ToriFuda>('toriFuda', {
      karutaId: 4
    })
  ],
  yomiFuda: create<YomiFuda>('yomiFuda', {
    karutaId: 1
  })
}));

registerFactory<Answer>('answer', () => ({
  correct: true,
  karutaId: 1,
  questionId: 1,
  time: 1000000
}));
