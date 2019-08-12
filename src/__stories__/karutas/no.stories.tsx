import React from 'react';
import { storiesOf } from '@storybook/react';
import KarutasNoPage, { Props } from '@src/gatsbyPages/karutas/no';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';

const props: Props = {
  pageContext: {
    karuta: create<Karuta>('karuta'),
  },
};

storiesOf('pages/karutas/no', module).add('default', () => <KarutasNoPage {...props} />);
