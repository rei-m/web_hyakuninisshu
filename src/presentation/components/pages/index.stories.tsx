import React from 'react';
import { storiesOf } from '@storybook/react';
import IndexPage from './index';
import { MOCK_ALL_KARUTA_LIST } from '@helper/mocks/domain/karutas';

storiesOf('pages/index', module).add('default', () => <IndexPage karutaList={MOCK_ALL_KARUTA_LIST} />);
