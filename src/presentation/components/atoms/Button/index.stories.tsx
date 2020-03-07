import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './index';

storiesOf('atoms/Button', module)
  .add('normal', () => <Button>ぼたん</Button>)
  .add('primary', () => <Button type={`accent`}>ぼたん</Button>);
