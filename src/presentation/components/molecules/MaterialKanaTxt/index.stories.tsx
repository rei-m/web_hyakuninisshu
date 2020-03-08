import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_KARUTA_1 } from '@helper/mocks/domain/karutas';
import MaterialKanaTxt from './index';

storiesOf('molecules/MaterialKanaTxt', module)
  .add('default', () => <MaterialKanaTxt karuta={MOCK_KARUTA_1} />)
  .add('with size s', () => <MaterialKanaTxt karuta={MOCK_KARUTA_1} size={`s`} />)
  .add('with size m', () => <MaterialKanaTxt karuta={MOCK_KARUTA_1} size={`m`} />)
  .add('with size l', () => <MaterialKanaTxt karuta={MOCK_KARUTA_1} size={`l`} />)
  .add('with kimariji over ', () => <MaterialKanaTxt karuta={{ ...MOCK_KARUTA_1, kimariji: 6 }} />)
  .add('with custom separate', () => <MaterialKanaTxt karuta={MOCK_KARUTA_1} separate={` `} />);
