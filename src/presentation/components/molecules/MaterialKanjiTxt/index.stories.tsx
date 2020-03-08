import React from 'react';
import { storiesOf } from '@storybook/react';
import MaterialKanjiTxt from './index';
import { MOCK_KARUTA_1 } from '@helper/mocks/domain/karutas';

storiesOf('molecules/MaterialKanjiTxt', module)
  .add('default', () => <MaterialKanjiTxt karuta={MOCK_KARUTA_1} />)
  .add('with size s', () => <MaterialKanjiTxt karuta={MOCK_KARUTA_1} size={`s`} />)
  .add('with size m', () => <MaterialKanjiTxt karuta={MOCK_KARUTA_1} size={`m`} />)
  .add('with size l', () => <MaterialKanjiTxt karuta={MOCK_KARUTA_1} size={`l`} />)
  .add('with custom separate', () => <MaterialKanjiTxt karuta={MOCK_KARUTA_1} separate={` `} />);
