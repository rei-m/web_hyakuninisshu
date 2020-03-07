import React from 'react';
import { storiesOf } from '@storybook/react';
import YomiFudaPhrase from './index';
import { MOCK_YOMIFUDA_1 } from '@helper/mocks/state/questions';

const props = {
  text: MOCK_YOMIFUDA_1.shoku,
  duration: 1,
  onAnimationEnd: () => {
    return;
  },
};

storiesOf('molecules/YomiFudaPhrase', module)
  .add('with anim', () => <YomiFudaPhrase {...props} />)
  .add('without anim', () => <YomiFudaPhrase {...props} duration={0} />);
