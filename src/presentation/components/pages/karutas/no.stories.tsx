import React from 'react';
import { storiesOf } from '@storybook/react';
import KarutasNoPage, { Props } from './no';
import { MOCK_FIRST_KARUTA } from '@helper/mocks/domain/karutas';

const props: Props = {
  karuta: MOCK_FIRST_KARUTA,
};

storiesOf('pages/karutas/no', module).add('default', () => <KarutasNoPage {...props} />);
