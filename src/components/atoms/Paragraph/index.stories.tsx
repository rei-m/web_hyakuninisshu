import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Paragraph from './index';

storiesOf('atoms/Paragraph', module).add('default', () => (
  <Paragraph>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, sint excepturi eaque commodi natus architecto! Et
    odit, itaque qui provident, a ipsum optio maxime obcaecati molestiae sequi quod ad quam?
  </Paragraph>
));
