import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Section from './index';
import Heading from '@src/components/atoms/Heading';

storiesOf('atoms/Section', module).add('default', () => (
  <Section heading={<Heading>title</Heading>} onClick={action('onClick')}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, sint excepturi eaque commodi natus architecto! Et
    odit, itaque qui provident, a ipsum optio maxime obcaecati molestiae sequi quod ad quam?
  </Section>
));
