import React from 'react';
import { storiesOf } from '@storybook/react';
import IndexPage, { Props } from '@src/pages';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';

const karutas = [...Array(100).keys()].map(i =>
  create<Karuta>('karuta', {
    no: i + 1,
  })
);

const props: Props = {
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

storiesOf('pages/index', module).add('default', () => <IndexPage {...props} />);
