import React from 'react';
import { storiesOf } from '@storybook/react';
import Txt from './index';

storiesOf('atoms/Txt', module)
  .add('default', () => <Txt>テキストを表示</Txt>)
  .add('error', () => <Txt role={'error'}>テキストを表示</Txt>)
  .add('with size SSS', () => <Txt size="sss">テキストを表示</Txt>)
  .add('with size SS', () => <Txt size="ss">テキストを表示</Txt>)
  .add('with size S', () => <Txt size="s">テキストを表示</Txt>)
  .add('with size M', () => <Txt size="m">テキストを表示</Txt>)
  .add('with size L', () => <Txt size="l">テキストを表示</Txt>);
