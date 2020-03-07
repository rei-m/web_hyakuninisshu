import React from 'react';
import { storiesOf } from '@storybook/react';
import YomiFuda from './index';
import { MOCK_YOMIFUDA_1 } from '@helper/mocks/state/questions';

const props = {
  yomiFuda: MOCK_YOMIFUDA_1,
  answered: false,
  duration: 1,
};

storiesOf('molecules/YomiFuda', module)
  .add('with anim', () => <YomiFuda {...props} />)
  .add('without anim', () => <YomiFuda {...props} duration={0} />)
  .add('with size s', () => <YomiFuda {...props} duration={0} size={`s`} />)
  .add('with size m', () => <YomiFuda {...props} duration={0} size={`m`} />)
  .add('with size l', () => <YomiFuda {...props} duration={0} size={`l`} />);
