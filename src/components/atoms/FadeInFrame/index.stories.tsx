import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FadeInFrame from './index';

storiesOf('atoms/FadeInFrame', module).add('default', () => (
  <FadeInFrame duration={5} onAnimationEnd={action('onAnimationEnd')}>
    コンテンツ
  </FadeInFrame>
));
