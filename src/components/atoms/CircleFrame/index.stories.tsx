import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@src/styles/styled-components';
import CircleFrame from './index';

const Enhanced = styled(CircleFrame)`
  width: 100px;
  height: 100px;
`;

storiesOf('atoms/CircleFrame', module).add('default', () => <Enhanced>コンテンツ</Enhanced>);
