import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import KarutaPlayingCorrect, { Props } from './index';
import { MOCK_KARUTA_1 } from '@helper/mocks/domain/karutas';

const props: Props = {
  questionId: 1,
  karuta: MOCK_KARUTA_1,
  isAllAnswered: false,
  onClickGoToNext: action('onClickGoToNext'),
  onClickGoToResult: action('onClickGoToResult'),
};

storiesOf('organisms/KarutaPlayingCorrect', module)
  .add('in answer', () => <KarutaPlayingCorrect {...props} />)
  .add('all answered', () => <KarutaPlayingCorrect {...props} isAllAnswered={true} />);
