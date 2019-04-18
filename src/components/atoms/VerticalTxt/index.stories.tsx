import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@src/styles/styled-components';
import VerticalTxt from './index';

const Enhanced = styled(VerticalTxt)`
  border-bottom: solid 1px #0f0;
`;

storiesOf('atoms/VerticalTxt', module)
  .add('with size default', () => <VerticalTxt>テキストを表示</VerticalTxt>)
  .add('with size SSS', () => <VerticalTxt size="sss">テキストを表示</VerticalTxt>)
  .add('with size SS', () => <VerticalTxt size="ss">テキストを表示</VerticalTxt>)
  .add('with size S', () => <VerticalTxt size="s">テキストを表示</VerticalTxt>)
  .add('with size M', () => <VerticalTxt size="m">テキストを表示</VerticalTxt>)
  .add('with size L', () => <VerticalTxt size="l">テキストを表示</VerticalTxt>)
  .add('with custom style', () => <Enhanced>テキストを表示</Enhanced>);
