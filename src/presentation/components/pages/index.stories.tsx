import React from 'react';
import { storiesOf } from '@storybook/react';
import IndexPage from './index';
import { MOCK_KARUTA_COLLECTION } from '@helper/mocks/domain/karutas';

storiesOf('pages/index', module).add('default', () => <IndexPage karutaCollection={MOCK_KARUTA_COLLECTION} />);
