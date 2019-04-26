import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxStoreDecorator } from '@helper/storybook';
import KarutasPage, { OwnProps } from '@src/pages/karutas';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';

const karutas = [...Array(100).keys()].map(i =>
  create<Karuta>('karuta', {
    no: i + 1,
  })
);

const props: OwnProps = {
  data: {
    allKaruta: {
      edges: karutas.map(k => ({
        node: {
          internal: {
            content: JSON.stringify(k),
          },
        },
      })),
    },
  },
};

storiesOf('pages/karutas', module)
  .addDecorator(story => reduxStoreDecorator(story))
  .add('default', () => <KarutasPage {...props} />);
