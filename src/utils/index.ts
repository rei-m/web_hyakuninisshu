import { ColorCondition, KarutaStyleCondition, KimarijiCondition, QuestionAnimCondition } from '@src/enums';
import { Color, Kimariji } from '@src/types';

const NUMS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

export const toChineseChar = (num: number): string => {
  if (num === 100) {
    return '百';
  }

  const ret: string[] = [''];

  const doubleDigits = Math.floor(num / 10);
  const singleDigits = num % 10;

  if (0 < doubleDigits) {
    if (1 < doubleDigits) {
      ret.push(NUMS[doubleDigits - 1]);
    }
    ret.push('十');
  }

  if (0 < singleDigits) {
    ret.push(NUMS[singleDigits - 1]);
  }

  return ret.join('');
};

export const toKarutaNoString = (karutaNo: number): string => `${toChineseChar(karutaNo)}番`;

export const toKimarijiString = (kimariji: Kimariji): string => `${toChineseChar(kimariji)}字決まり`;

export const toKimarijiConditionString = (kimarijiCondition: KimarijiCondition): string =>
  kimarijiCondition === KimarijiCondition.None ? '指定しない' : toKimarijiString(kimarijiCondition);

export const toColorString = (color: Color): string => {
  switch (color) {
    case 'blue':
      return '青色';
    case 'pink':
      return '桃色';
    case 'yellow':
      return '黄色';
    case 'green':
      return '緑色';
    case 'orange':
      return '橙色';
    default:
      throw new Error(`unknown color. value is ${color}`);
  }
};

export const toColorConditionString = (colorCondition: ColorCondition): string =>
  colorCondition === ColorCondition.None ? '指定しない' : toColorString(colorCondition);

export const toKarutaStyleConditionString = (karutaStyle: KarutaStyleCondition): string => {
  switch (karutaStyle) {
    case KarutaStyleCondition.KanjiAndKana:
      return '漢字と仮名で表示';
    case KarutaStyleCondition.KanaOnly:
      return 'すべて仮名で表示';
    default:
      throw new Error(`unknown karutaStyle. value is ${karutaStyle}`);
  }
};

export const toQuestionAnimConditionString = (questionAnimCondition: QuestionAnimCondition): string => {
  switch (questionAnimCondition) {
    case QuestionAnimCondition.None:
      return 'なし';
    case QuestionAnimCondition.Slow:
      return 'おそめ';
    case QuestionAnimCondition.Normal:
      return 'ふつう';
    case QuestionAnimCondition.Fast:
      return 'はやめ';
    default:
      throw new Error(`unknown animCondition. value is ${questionAnimCondition}`);
  }
};

export const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const randomizeArray = <T>(array: T[]): T[] => {
  const dup = [...array];
  for (let i = dup.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = dup[i];
    dup[i] = dup[r];
    dup[r] = tmp;
  }
  return dup;
};
