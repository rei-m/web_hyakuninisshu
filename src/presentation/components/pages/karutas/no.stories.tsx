import React from 'react';
import { storiesOf } from '@storybook/react';
import KarutasNoPage, { Props } from './no';
import { MOCK_KARUTA_1 } from '@helper/mocks/domain/karutas';

const props: Props = {
  karuta: MOCK_KARUTA_1,
};

storiesOf('pages/karutas/no', module).add('default', () => <KarutasNoPage {...props} />);
