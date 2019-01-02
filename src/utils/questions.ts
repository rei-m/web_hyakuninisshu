import { Karuta } from '@src/types';
import { getRandomInt, randomizeArray } from '@src/utils';

export const filterByRange = (karutas: Karuta[], rangeFrom: number, rangeTo: number) =>
  karutas.slice(rangeFrom - 1, rangeTo);

export const filterByKimariji = (karutas: Karuta[], kimariji: number) =>
  kimariji <= 0 ? karutas : karutas.filter(k => k.kimariji === kimariji);

export const filterByColor = (karutas: Karuta[], color: string) =>
  color === '' ? karutas : karutas.filter(k => k.color === color);

export const questionsFilter = (karutas: Karuta[]) => {
  return (rangeFrom: number, rangeTo: number) => {
    const rangeResult = filterByRange(karutas, rangeFrom, rangeTo);
    return (kimariji: number) => {
      const kimarijiResult = filterByKimariji(rangeResult, kimariji);
      return (color: string) => {
        return filterByColor(kimarijiResult, color);
      };
    };
  };
};

export const fetchTorifudas = (karutas: Karuta[], correctKaruta: Karuta) => {
  const dupKarutas = [...karutas].filter(k => k.id !== correctKaruta.id);
  const result = Array.from(Array(3).keys())
    .map(_ => {
      const index = getRandomInt(0, dupKarutas.length - 1);
      const [karuta] = dupKarutas.splice(index, 1);
      return karuta;
    })
    .concat(correctKaruta);

  return randomizeArray(result);
};
