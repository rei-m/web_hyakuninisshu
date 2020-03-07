import React from 'react';
import { storiesOf } from '@storybook/react';
import Fuda from './index';
import { MOCK_KARUTA_1 } from '@helper/mocks/domain/karutas';

storiesOf('molecules/Fuda', module)
  .add('default', () => <Fuda karuta={MOCK_KARUTA_1} />)
  .add('with size s', () => <Fuda karuta={MOCK_KARUTA_1} size={`s`} />)
  .add('with size m', () => <Fuda karuta={MOCK_KARUTA_1} size={`m`} />)
  .add('with size l', () => <Fuda karuta={MOCK_KARUTA_1} size={`l`} />);
