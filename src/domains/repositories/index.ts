import { KARUTA_LIST } from '@/assets/karuta';
import { Karuta, KarutaNo, Kimariji, Color } from '../models';
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
 * 歌リポジトリ（本来はこーいう使い方ではない）
 */
export interface KarutaRepository {
  all: () => ReadonlyArray<Karuta>;
  where: (condition: SelectCondition) => ReadonlyArray<Karuta>;
  findByNo: (condition: { karutaNo: KarutaNo }) => Karuta;
  findByNoList: (condition: { karataNoList: ReadonlyArray<KarutaNo> }) => ReadonlyArray<Karuta>;
}

export const karutaRepository: KarutaRepository = ((karutaList) => {
  const allNoList: Array<KarutaNo> = [];
  const byNo: { [no: KarutaNo]: Karuta } = {};
  karutaList.forEach((karuta) => {
    allNoList.push(karuta.no);
    byNo[karuta.no] = karuta;
  });

  return {
    all: (): ReadonlyArray<Karuta> => {
      return allNoList.map((no) => byNo[no]);
    },
    where: ({ range, kimarijiList, colorList }: SelectCondition): ReadonlyArray<Karuta> => {
      if (range.to < range.from) {
        throw new IllegalArgumentError(`IllegalArgument: range=${JSON.stringify(range)}`);
      }
      const allKarutaList = allNoList.map((no) => byNo[no]);
      return filter(allKarutaList)(range)(kimarijiList)(colorList);
    },
    findByNo: ({ karutaNo }: { karutaNo: KarutaNo }) => {
      return byNo[karutaNo];
    },
    findByNoList: ({ karataNoList }: { karataNoList: ReadonlyArray<KarutaNo> }) => {
      return karataNoList.map((karutaNo) => byNo[karutaNo]);
    },
  };
})(KARUTA_LIST);
