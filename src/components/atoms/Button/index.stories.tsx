import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@src/styles/styled-components';
import Button from './index';

const Enhanced = styled(Button)`
  font-weight: bold !important;
`;

storiesOf('atoms/Button', module)
  .add('normal', () => <Button>ぼたん</Button>)
  .add('primary', () => <Button type={`accent`}>ぼたん</Button>)
  .add('custom class', () => <Enhanced>ぼたん</Enhanced>);
