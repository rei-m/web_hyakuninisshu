import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@src/styles/styled-components';
import Txt from './index';

const Enhanced = styled(Txt)`
  border-bottom: solid 1px #0f0;
`;

storiesOf('atoms/Txt', module)
  .add('default', () => <Txt>テキストを表示</Txt>)
  .add('error', () => <Txt role={'error'}>テキストを表示</Txt>)
  .add('with size SSS', () => <Txt size="sss">テキストを表示</Txt>)
  .add('with size SS', () => <Txt size="ss">テキストを表示</Txt>)
  .add('with size S', () => <Txt size="s">テキストを表示</Txt>)
  .add('with size M', () => <Txt size="m">テキストを表示</Txt>)
  .add('with size L', () => <Txt size="l">テキストを表示</Txt>)
  .add('with custom style', () => <Enhanced>テキストを表示</Enhanced>);
