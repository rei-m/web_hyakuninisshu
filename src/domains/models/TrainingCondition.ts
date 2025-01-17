import type { Color } from './Color';
import type { Kimariji } from './Kimariji';

export type TrainingConditionRangeFrom = 1 | 11 | 21 | 31 | 41 | 51 | 61 | 71 | 81 | 91;
export type TrainingConditionRangeTo = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
export type TrainingConditionDisplayStyle = 'kanji' | 'kana';
export type TrainingConditionAnim = 'none' | 'slow' | 'normal' | 'fast';
export type TrainingConditionKimariji = Kimariji | null;
export type TrainingConditionColor = Color | null;
export type TrainingCondition = {
  rangeFrom: TrainingConditionRangeFrom;
  rangeTo: TrainingConditionRangeTo;
  kimariji: TrainingConditionKimariji;
  color: TrainingConditionColor;
  kamiNoKuStyle: TrainingConditionDisplayStyle;
  shimoNoKuStyle: TrainingConditionDisplayStyle;
  questionAnim: TrainingConditionAnim;
  emptyError?: string;
};

export const RANGE_FROM_LIST: ReadonlyArray<TrainingConditionRangeFrom> = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
export const RANGE_TO_LIST: ReadonlyArray<TrainingConditionRangeTo> = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
export const KIMARIJI_LIST: ReadonlyArray<TrainingConditionKimariji> = [null, 1, 2, 3, 4, 5, 6];
export const COLOR_LIST: ReadonlyArray<TrainingConditionColor> = [null, 'blue', 'pink', 'yellow', 'green', 'orange'];
export const DISPLAY_STYLE_LIST: ReadonlyArray<TrainingConditionDisplayStyle> = ['kanji', 'kana'];
export const ANIM_LIST: ReadonlyArray<TrainingConditionAnim> = ['none', 'slow', 'normal', 'fast'];

export const conditionAnimToDulation = ({ anim }: { anim: TrainingConditionAnim }) => {
  switch (anim) {
    case 'normal':
      return 600;
    case 'fast':
      return 300;
    case 'slow':
      return 1000;
    default:
      return 0;
  }
};
