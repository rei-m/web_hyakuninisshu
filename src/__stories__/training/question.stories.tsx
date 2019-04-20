// import * as React from 'react';
// import { storiesOf } from '@storybook/react';
// import { appContextDecorator } from '@helper/storybook';
// import TrainingQuestionPage, { Props } from '@src/pages/training/question';
// import { create } from '@helper/factory';
// import { Karuta } from '@src/types';

// const karutas = [...Array(100).keys()].map(i =>
//   create<Karuta>('karuta', {
//     no: i + 1,
//   })
// );

// const props: Props = {
//   data: {
//     allKaruta: {
//       edges: karutas.map(k => ({
//         node: {
//           internal: {
//             content: JSON.stringify(k),
//           },
//         },
//       })),
//     },
//   },
// };

// storiesOf('pages/training/question', module)
//   .addDecorator(story => appContextDecorator(story))
//   .add('default', () => <TrainingQuestionPage {...props} />);
