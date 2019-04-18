import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Progress from './index';

storiesOf('atoms/Progress', module)
  .add('default', () => <Progress />)
  .add('custom', () => <Progress size={200} color={`#0f0`} />);
