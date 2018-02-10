import { Karuta } from '../../src/types';

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
