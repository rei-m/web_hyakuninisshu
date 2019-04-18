import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Heading from './index';

storiesOf('atoms/Heading', module)
  .add('lavel 1', () => <Heading level={1}>たいとる</Heading>)
  .add('lavel 2', () => <Heading level={2}>たいとる</Heading>)
  .add('lavel 3', () => <Heading level={3}>たいとる</Heading>)
  .add('lavel 4', () => <Heading level={4}>たいとる</Heading>)
  .add('lavel 5', () => <Heading level={5}>たいとる</Heading>)
  .add('lavel 6', () => <Heading level={6}>たいとる</Heading>);
