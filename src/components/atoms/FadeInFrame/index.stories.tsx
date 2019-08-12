import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from '@src/styles/styled-components';
import FadeInFrame from './index';

const Enhanced = styled(FadeInFrame)`
  width: 100px;
  height: 100px;
`;

storiesOf('atoms/FadeInFrame', module).add('default', () => (
  <Enhanced duration={1} onAnimationEnd={action('onAnimationEnd')}>
    コンテンツ
  </Enhanced>
));
