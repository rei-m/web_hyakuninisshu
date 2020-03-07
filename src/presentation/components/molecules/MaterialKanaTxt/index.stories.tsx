import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_FIRST_KARUTA } from '@helper/mocks/domain/karutas';
import MaterialKanaTxt from './index';

storiesOf('molecules/MaterialKanaTxt', module)
  .add('default', () => <MaterialKanaTxt karuta={MOCK_FIRST_KARUTA} />)
  .add('with size s', () => <MaterialKanaTxt karuta={MOCK_FIRST_KARUTA} size={`s`} />)
  .add('with size m', () => <MaterialKanaTxt karuta={MOCK_FIRST_KARUTA} size={`m`} />)
  .add('with size l', () => <MaterialKanaTxt karuta={MOCK_FIRST_KARUTA} size={`l`} />)
  .add('with kimariji over ', () => <MaterialKanaTxt karuta={{ ...MOCK_FIRST_KARUTA, kimariji: 6 }} />)
  .add('with custom separate', () => <MaterialKanaTxt karuta={MOCK_FIRST_KARUTA} separate={` `} />);
