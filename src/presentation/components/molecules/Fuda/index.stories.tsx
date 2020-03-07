import React from 'react';
import { storiesOf } from '@storybook/react';
import Fuda from './index';
import { MOCK_FIRST_KARUTA } from '@helper/mocks/domain/karutas';

storiesOf('molecules/Fuda', module)
  .add('default', () => <Fuda karuta={MOCK_FIRST_KARUTA} />)
  .add('with size s', () => <Fuda karuta={MOCK_FIRST_KARUTA} size={`s`} />)
  .add('with size m', () => <Fuda karuta={MOCK_FIRST_KARUTA} size={`m`} />)
  .add('with size l', () => <Fuda karuta={MOCK_FIRST_KARUTA} size={`l`} />);
