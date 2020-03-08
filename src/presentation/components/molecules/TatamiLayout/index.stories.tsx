import React from 'react';
import { storiesOf } from '@storybook/react';
import TatamiLayout from './index';

storiesOf('molecules/TatamiLayout', module).add('default', () => (
  <TatamiLayout>背景に畳表示するレイアウト</TatamiLayout>
));
