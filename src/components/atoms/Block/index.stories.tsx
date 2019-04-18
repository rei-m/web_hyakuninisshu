import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Block from './index';

storiesOf('atoms/Block', module).add('default', () => (
  <Block onClick={action('onClick')}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, sint excepturi eaque commodi natus architecto! Et
    odit, itaque qui provident, a ipsum optio maxime obcaecati molestiae sequi quod ad quam?
  </Block>
));
