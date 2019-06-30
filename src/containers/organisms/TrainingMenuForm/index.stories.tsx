import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PresenterProps, TrainingMenuFormPresenter } from './index';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';

const props: PresenterProps = {
  initialRangeFrom: RangeFromCondition.One,
  initialRangeTo: RangeToCondition.OneHundred,
  initialKimariji: KimarijiCondition.None,
  initialColor: ColorCondition.None,
  initialKamiNoKuStyle: KarutaStyleCondition.KanaOnly,
  initialShimoNoKuStyle: KarutaStyleCondition.KanjiAndKana,
  initialQuestionAnim: QuestionAnimCondition.Normal,
  onSubmit: action('onSubmit'),
};

storiesOf('organisms/TrainingMenuForm', module).add('default', () => <TrainingMenuFormPresenter {...props} />);
