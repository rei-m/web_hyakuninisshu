// このIFは苦肉の策だが他にいい方法はあるのか。。。
export interface EnumCollection<T> {
  readonly values: T[];
  readonly valueOf: (value: T) => T;
}

export enum MenuType {
  Training,
  Exam,
  Material,
  Other
}

export enum QuestionState {
  InAnswer,
  Answered,
  ConfirmCorrect,
  Finished
}

export enum RangeFromCondition {
  One = 1,
  Eleven = 11,
  TwentyOne = 21,
  ThirtyOne = 31,
  FortyOne = 41,
  FiftyOne = 51,
  SixtyOne = 61,
  SeventyOne = 71,
  EightyOne = 81,
  NinetyOne = 91
}

export const RangeFromConditions: EnumCollection<RangeFromCondition> = {
  valueOf: (value: number) => {
    const result = RangeFromConditions.values.find(v => v === value);
    if (result !== undefined) {
      return result;
    }
    throw new Error(`unknown RangeFrom, value is ${value}`);
  },
  values: [
    RangeFromCondition.One,
    RangeFromCondition.Eleven,
    RangeFromCondition.TwentyOne,
    RangeFromCondition.ThirtyOne,
    RangeFromCondition.FortyOne,
    RangeFromCondition.FiftyOne,
    RangeFromCondition.SixtyOne,
    RangeFromCondition.SeventyOne,
    RangeFromCondition.EightyOne,
    RangeFromCondition.NinetyOne
  ]
};

export enum RangeToCondition {
  Ten = 10,
  Twenty = 20,
  Thirty = 30,
  Forty = 40,
  Fifty = 50,
  Sixty = 60,
  Seventy = 70,
  Eighty = 80,
  Ninety = 90,
  OneHundred = 100
}

export const RangeToConditions: EnumCollection<RangeToCondition> = {
  valueOf: (value: number) => {
    const result = RangeToConditions.values.find(v => v === value);
    if (result !== undefined) {
      return result;
    }
    throw new Error(`unknown RangeTo, value is ${value}`);
  },
  values: [
    RangeToCondition.Ten,
    RangeToCondition.Twenty,
    RangeToCondition.Thirty,
    RangeToCondition.Forty,
    RangeToCondition.Fifty,
    RangeToCondition.Sixty,
    RangeToCondition.Seventy,
    RangeToCondition.Eighty,
    RangeToCondition.Ninety,
    RangeToCondition.OneHundred
  ]
};

export enum KimarijiCondition {
  None = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6
}

export const KimarijiConditions: EnumCollection<KimarijiCondition> = {
  valueOf: (value: number) => {
    const result = KimarijiConditions.values.find(v => v === value);
    if (result !== undefined) {
      return result;
    }
    throw new Error(`unknown Kimariji, value is ${value}`);
  },
  values: [
    KimarijiCondition.None,
    KimarijiCondition.One,
    KimarijiCondition.Two,
    KimarijiCondition.Three,
    KimarijiCondition.Four,
    KimarijiCondition.Five,
    KimarijiCondition.Six
  ]
};

export enum ColorCondition {
  None = '',
  Blue = 'blue',
  Pink = 'pink',
  Yellow = 'yellow',
  Green = 'green',
  Orange = 'orange'
}

export const ColorConditions: EnumCollection<ColorCondition> = {
  valueOf: (value: string) => {
    const result = ColorConditions.values.find(v => v === value);
    if (result !== undefined) {
      return result;
    }
    throw new Error(`unknown Color, value is ${value}`);
  },
  values: [
    ColorCondition.None,
    ColorCondition.Blue,
    ColorCondition.Pink,
    ColorCondition.Yellow,
    ColorCondition.Green,
    ColorCondition.Orange
  ]
};

export enum KarutaStyleCondition {
  KanjiAndKana = 0,
  KanaOnly = 1
}

export const KarutaStyleConditions: EnumCollection<KarutaStyleCondition> = {
  valueOf: (value: number) => {
    const result = KarutaStyleConditions.values.find(v => v === value);
    if (result !== undefined) {
      return result;
    }
    throw new Error(`unknown KarutaStyle, value is ${value}`);
  },
  values: [KarutaStyleCondition.KanjiAndKana, KarutaStyleCondition.KanaOnly]
};
