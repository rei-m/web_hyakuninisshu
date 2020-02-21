import React from 'react';
import { storiesOf } from '@storybook/react';
import Material from './index';
import { MOCK_FIRST_KARUTA } from '@helper/mocks/domain/karutas';

storiesOf('organisms/Material', module).add('default', () => <Material karuta={MOCK_FIRST_KARUTA} />);
