import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@src/styles/styled-components';
import CenteredFrame from './index';

const Enhanced = styled(CenteredFrame)`
  width: 100px;
  height: 100px;
  border: 1px solid #123;
`;

storiesOf('atoms/CenteredFrame', module).add('default', () => <Enhanced>コンテンツ</Enhanced>);
