import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@src/styles/styled-components';
import TatamiLayout from './index';

const Enhanced = styled(TatamiLayout)`
  color: #f00;
`;

storiesOf('molecules/TatamiLayout', module)
  .add('default', () => <TatamiLayout>背景に畳表示するレイアウト</TatamiLayout>)
  .add('with custom style', () => <Enhanced>背景に畳表示するレイアウト</Enhanced>);
