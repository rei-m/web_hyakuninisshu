import React from 'react';
import { storiesOf } from '@storybook/react';
import YomiFudaPhrase from './index';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';

const karuta = create<Karuta>('karuta', {
  no: 1,
});

const props = {
  text: karuta.firstKana,
  duration: 1,
  onAnimationEnd: () => {
    return;
  },
};

storiesOf('molecules/YomiFudaPhrase', module)
  .add('with anim', () => <YomiFudaPhrase {...props} />)
  .add('without anim', () => <YomiFudaPhrase {...props} duration={0} />);
