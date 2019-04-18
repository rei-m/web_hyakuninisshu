import * as React from 'react';
import { storiesOf } from '@storybook/react';
import MaterialKanjiTxt from './index';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';

const karuta = create<Karuta>('karuta', {
  no: 1,
});

storiesOf('molecules/MaterialKanjiTxt', module)
  .add('default', () => <MaterialKanjiTxt karuta={karuta} />)
  .add('with size s', () => <MaterialKanjiTxt karuta={karuta} size={`s`} />)
  .add('with size m', () => <MaterialKanjiTxt karuta={karuta} size={`m`} />)
  .add('with size l', () => <MaterialKanjiTxt karuta={karuta} size={`l`} />)
  .add('with custom separate', () => <MaterialKanjiTxt karuta={karuta} separate={` `} />);
