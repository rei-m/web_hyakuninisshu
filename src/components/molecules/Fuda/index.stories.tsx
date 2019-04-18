import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Fuda from './index';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';

const karuta = create<Karuta>('karuta', {
  no: 1,
});

storiesOf('molecules/Fuda', module)
  .add('default', () => <Fuda karuta={karuta} />)
  .add('with size s', () => <Fuda karuta={karuta} size={`s`} />)
  .add('with size m', () => <Fuda karuta={karuta} size={`m`} />)
  .add('with size l', () => <Fuda karuta={karuta} size={`l`} />);
