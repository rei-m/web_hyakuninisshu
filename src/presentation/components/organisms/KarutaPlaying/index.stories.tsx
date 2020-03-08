import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import KarutaPlaying, { Props } from './index';
import {
  MOCK_YOMIFUDA_1,
  MOCK_TORIFUDA_1,
  MOCK_TORIFUDA_2,
  MOCK_TORIFUDA_3,
  MOCK_TORIFUDA_4,
} from '@helper/mocks/state/questions';

const props: Props = {
  questionId: 1,
  yomiFuda: MOCK_YOMIFUDA_1,
  toriFudaList: [MOCK_TORIFUDA_1, MOCK_TORIFUDA_2, MOCK_TORIFUDA_3, MOCK_TORIFUDA_4],
  totalCount: 10,
  currentPosition: 1,
  duration: 1,
  onClickToriFuda: action('onClickToriFuda'),
  onClickResult: action('onClickResult'),
};

storiesOf('organisms/KarutaPlaying', module)
  .add('in answer', () => <KarutaPlaying {...props} />)
  .add('answered', () => (
    <KarutaPlaying
      {...props}
      answer={{
        isCorrect: true,
        selectedKarutaNo: MOCK_TORIFUDA_1.karutaNo,
      }}
    />
  ));
