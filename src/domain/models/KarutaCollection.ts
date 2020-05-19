import { Karuta, KarutaNo, Kimariji, Color } from '.';
import { IllegalArgumentError } from '../errors';

type SelectCondition = {
  range: { from: KarutaNo; to: KarutaNo };
  kimarijiList: ReadonlyArray<Kimariji>;
  colorList: ReadonlyArray<Color>;
};

const filterByRange = (karutaList: ReadonlyArray<Karuta>, range: { from: KarutaNo; to: KarutaNo }) =>
  karutaList.slice(range.from - 1, range.to);

const filterByKimariji = (karutaList: ReadonlyArray<Karuta>, kimarijiList: ReadonlyArray<Kimariji>) => {
  const kimarijiSet = new Set<Kimariji>(kimarijiList);
  return karutaList.filter((k) => kimarijiSet.has(k.kimariji));
};

const filterByColor = (karutaList: ReadonlyArray<Karuta>, colorList: ReadonlyArray<Color>) => {
  const colorSet = new Set<Color>(colorList);
  return karutaList.filter((k) => colorSet.has(k.color));
};

const filter = (karutaList: ReadonlyArray<Karuta>) => {
  return (range: { from: KarutaNo; to: KarutaNo }) => {
    const rangeResult = filterByRange(karutaList, range);
    return (kimarijiList: ReadonlyArray<Kimariji>) => {
      const kimarijiResult = filterByKimariji(rangeResult, kimarijiList);
      return (colorList: ReadonlyArray<Color>) => {
        return filterByColor(kimarijiResult, colorList);
      };
    };
  };
};

/**
 * 百人一首の全ての歌コレクション
 */
export type KarutaCollection = Readonly<{
  karutaList: ReadonlyArray<Karuta>;
}>;
export const KarutaCollection = {
  select: (
    karutaCollection: KarutaCollection,
    { range, kimarijiList, colorList }: SelectCondition
  ): ReadonlyArray<Karuta> => {
    if (range.to < range.from) {
      throw new IllegalArgumentError(`IllegalArgument: range=${JSON.stringify(range)}`);
    }
    return filter(karutaCollection.karutaList)(range)(kimarijiList)(colorList);
  },
};
