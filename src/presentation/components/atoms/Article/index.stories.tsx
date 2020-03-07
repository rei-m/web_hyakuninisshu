import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Article from './index';
import Heading from '@src/presentation/components/atoms/Heading';

storiesOf('atoms/Article', module).add('default', () => (
  <Article heading={<Heading>title</Heading>} onClick={action('onClick')}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, sint excepturi eaque commodi natus architecto! Et
    odit, itaque qui provident, a ipsum optio maxime obcaecati molestiae sequi quod ad quam?
  </Article>
));
