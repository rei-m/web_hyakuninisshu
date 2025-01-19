import type {
  TrainingCondition,
  TrainingConditionAnim,
  TrainingConditionColor,
  TrainingConditionDisplayStyle,
  TrainingConditionKimariji,
  TrainingConditionRangeFrom,
  TrainingConditionRangeTo,
} from '@/domains/models';

import { useMemo, useState } from 'react';

export type Errors = {
  range?: string;
};

export type Setters = {
  rangeFrom: (value: TrainingConditionRangeFrom) => void;
  rangeTo: (value: TrainingConditionRangeTo) => void;
  kimariji: (value: TrainingConditionKimariji) => void;
  color: (value: TrainingConditionColor) => void;
  kamiNoKuStyle: (value: TrainingConditionDisplayStyle) => void;
  shimoNoKuStyle: (value: TrainingConditionDisplayStyle) => void;
  questionAnim: (value: TrainingConditionAnim) => void;
};

export type Return = {
  value: TrainingCondition;
  errors: Errors;
  setters: Setters;
};

export const useTrainingMenuForm = (initialValue: TrainingCondition): Return => {
  const [rangeFrom, setRangeFrom] = useState(initialValue.rangeFrom);
  const [rangeTo, setRangeTo] = useState(initialValue.rangeTo);
  const [kimariji, setKimariji] = useState(initialValue.kimariji);
  const [color, setColor] = useState(initialValue.color);
  const [kamiNoKuStyle, setKamiNoKuStyle] = useState(initialValue.kamiNoKuStyle);
  const [shimoNoKuStyle, setShimoNoKuStyle] = useState(initialValue.shimoNoKuStyle);
  const [questionAnim, setQuestionAnim] = useState(initialValue.questionAnim);

  const rangeError = useMemo(() => {
    if (rangeFrom > rangeTo) {
      return '出題範囲の始まりは終わりより小さい数を指定してください';
    }
    return undefined;
  }, [rangeFrom, rangeTo]);

  return {
    value: {
      rangeFrom,
      rangeTo,
      kimariji,
      color,
      kamiNoKuStyle,
      shimoNoKuStyle,
      questionAnim,
    },
    errors: {
      range: rangeError,
    },
    setters: {
      rangeFrom: setRangeFrom,
      rangeTo: setRangeTo,
      kimariji: setKimariji,
      color: setColor,
      kamiNoKuStyle: setKamiNoKuStyle,
      shimoNoKuStyle: setShimoNoKuStyle,
      questionAnim: setQuestionAnim,
    },
  };
};
