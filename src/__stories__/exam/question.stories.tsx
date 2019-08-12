import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxStoreDecorator } from '@helper/storybook';
import ExamQuestionPage, { Props } from '@src/pages/exam/question';
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

storiesOf('pages/exam/question', module)
  .addDecorator(story => reduxStoreDecorator(story))
  .add('default', () => <ExamQuestionPage {...props} />);
