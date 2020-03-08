import { Karuta, KarutaNo, Kimariji, Color } from '.';
import { IllegalArgumentError } from '../errors';

type SelectCondition = {
  range: { from: KarutaNo; to: KarutaNo };
  kimarijiList: Array<Kimariji>;
  colorList: Array<Color>;
};

const filterByRange = (karutaList: Array<Karuta>, range: { from: KarutaNo; to: KarutaNo }) =>
  karutaList.slice(range.from - 1, range.to);

const filterByKimariji = (karutaList: Array<Karuta>, kimarijiList: Array<Kimariji>) => {
  const kimarijiSet = new Set<Kimariji>(kimarijiList);
  return karutaList.filter(k => kimarijiSet.has(k.kimariji));
};

const filterByColor = (karutaList: Array<Karuta>, colorList: Array<Color>) => {
  const colorSet = new Set<Color>(colorList);
  return karutaList.filter(k => colorSet.has(k.color));
};

const filter = (karutaList: Array<Karuta>) => {
  return (range: { from: KarutaNo; to: KarutaNo }) => {
    const rangeResult = filterByRange(karutaList, range);
    return (kimarijiList: Array<Kimariji>) => {
      const kimarijiResult = filterByKimariji(rangeResult, kimarijiList);
      return (colorList: Array<Color>) => {
        return filterByColor(kimarijiResult, colorList);
      };
    };
  };
};

export const KarutaCollection = {
  select: (allKarutaList: Array<Karuta>, { range, kimarijiList, colorList }: SelectCondition): Array<Karuta> => {
    if (allKarutaList.length !== KarutaNo.MAX_VALUE) {
      throw new IllegalArgumentError(`allKarutaList.length=${allKarutaList.length}`);
    }
    if (range.to < range.from) {
      throw new IllegalArgumentError(`IllegalArgument: range=${JSON.stringify(range)}`);
    }
    return filter(allKarutaList)(range)(kimarijiList)(colorList);
  },
};
