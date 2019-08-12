import React from 'react';
import { storiesOf } from '@storybook/react';
import MaterialKanaTxt from './index';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';

const karuta = create<Karuta>('karuta', {
  no: 1,
});

storiesOf('molecules/MaterialKanaTxt', module)
  .add('default', () => <MaterialKanaTxt karuta={karuta} />)
  .add('with size s', () => <MaterialKanaTxt karuta={karuta} size={`s`} />)
  .add('with size m', () => <MaterialKanaTxt karuta={karuta} size={`m`} />)
  .add('with size l', () => <MaterialKanaTxt karuta={karuta} size={`l`} />)
  .add('with kimariji over ', () => <MaterialKanaTxt karuta={{ ...karuta, kimariji: 6 }} />)
  .add('with custom separate', () => <MaterialKanaTxt karuta={karuta} separate={` `} />);
