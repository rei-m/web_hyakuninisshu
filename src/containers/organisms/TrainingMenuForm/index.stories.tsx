import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Props, TrainingMenuForm } from './index';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';

const props: Props = {
  initialRangeFrom: RangeFromCondition.One,
  initialRangeTo: RangeToCondition.OneHundred,
  initialKimariji: KimarijiCondition.None,
  initialColor: ColorCondition.None,
  initialKamiNoKuStyle: KarutaStyleCondition.KanaOnly,
  initialShimoNoKuStyle: KarutaStyleCondition.KanjiAndKana,
  initialQuestionAnim: QuestionAnimCondition.Normal,
  onSubmit: action('onSubmit'),
};

storiesOf('organisms/TrainingMenuForm', module).add('default', () => <TrainingMenuForm {...props} />);
