import React from 'react';
import { storiesOf } from '@storybook/react';
import Material from './index';
import { MOCK_KARUTA_1 } from '@helper/mocks/domain/karutas';

storiesOf('organisms/Material', module).add('default', () => <Material karuta={MOCK_KARUTA_1} />);
