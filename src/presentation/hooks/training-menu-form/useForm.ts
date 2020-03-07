import { useState } from 'react';
import { questionsTypes } from '@src/state/questions';
import { useRangeField } from './useRangeField';

export type Values = {
  range: { from: questionsTypes.RangeFromCondition; to: questionsTypes.RangeToCondition };
  kimariji: questionsTypes.KimarijiCondition;
  color: questionsTypes.ColorCondition;
  kamiNoKuStyle: questionsTypes.KarutaStyleCondition;
  shimoNoKuStyle: questionsTypes.KarutaStyleCondition;
  questionAnim: questionsTypes.QuestionAnimCondition;
};

export type Errors = {
  range: string | undefined;
};

export type Setters = {
  range: (value: { from: questionsTypes.RangeFromCondition; to: questionsTypes.RangeToCondition }) => void;
  kimariji: (value: questionsTypes.KimarijiCondition) => void;
  color: (value: questionsTypes.ColorCondition) => void;
  kamiNoKuStyle: (value: questionsTypes.KarutaStyleCondition) => void;
  shimoNoKuStyle: (value: questionsTypes.KarutaStyleCondition) => void;
  questionAnim: (value: questionsTypes.QuestionAnimCondition) => void;
};

export const useForm = (initialValue: {
  rangeFrom: questionsTypes.RangeFromCondition;
  rangeTo: questionsTypes.RangeToCondition;
  kimariji: questionsTypes.KimarijiCondition;
  color: questionsTypes.ColorCondition;
  kamiNoKuStyle: questionsTypes.KarutaStyleCondition;
  shimoNoKuStyle: questionsTypes.KarutaStyleCondition;
  questionAnim: questionsTypes.QuestionAnimCondition;
}): {
  values: Values;
  errors: Errors;
  setters: Setters;
} => {
  const range = useRangeField({ from: initialValue.rangeFrom, to: initialValue.rangeTo });
  const [kimariji, setKimariji] = useState<questionsTypes.KimarijiCondition>(initialValue.kimariji);
  const [color, setColor] = useState<questionsTypes.ColorCondition>(initialValue.color);
  const [kamiNoKuStyle, setKamiNoKuStyle] = useState<questionsTypes.KarutaStyleCondition>(initialValue.kamiNoKuStyle);
  const [shimoNoKuStyle, setShimoNoKuStyle] = useState<questionsTypes.KarutaStyleCondition>(
    initialValue.shimoNoKuStyle
  );
  const [questionAnim, setQuestionAnim] = useState<questionsTypes.QuestionAnimCondition>(initialValue.questionAnim);

  return {
    values: {
      range: range.value,
      kimariji,
      color,
      kamiNoKuStyle,
      shimoNoKuStyle,
      questionAnim,
    },
    errors: {
      range: range.error,
    },
    setters: {
      range: range.set,
      kimariji: setKimariji,
      color: setColor,
      kamiNoKuStyle: setKamiNoKuStyle,
      shimoNoKuStyle: setShimoNoKuStyle,
      questionAnim: setQuestionAnim,
    },
  };
};
