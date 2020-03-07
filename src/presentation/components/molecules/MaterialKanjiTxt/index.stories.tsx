import React from 'react';
import { storiesOf } from '@storybook/react';
import MaterialKanjiTxt from './index';
import { MOCK_FIRST_KARUTA } from '@helper/mocks/domain/karutas';

storiesOf('molecules/MaterialKanjiTxt', module)
  .add('default', () => <MaterialKanjiTxt karuta={MOCK_FIRST_KARUTA} />)
  .add('with size s', () => <MaterialKanjiTxt karuta={MOCK_FIRST_KARUTA} size={`s`} />)
  .add('with size m', () => <MaterialKanjiTxt karuta={MOCK_FIRST_KARUTA} size={`m`} />)
  .add('with size l', () => <MaterialKanjiTxt karuta={MOCK_FIRST_KARUTA} size={`l`} />)
  .add('with custom separate', () => <MaterialKanjiTxt karuta={MOCK_FIRST_KARUTA} separate={` `} />);
