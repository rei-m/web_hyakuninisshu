import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxStoreDecorator } from '@helper/storybook';
import TrainingResultPage, { Props } from '@src/pages/training/result';
import { QuestionState } from '@src/enums';

const props: Props = {
  questionState: QuestionState.Finished,
};

storiesOf('pages/training/result', module)
  .addDecorator(story => reduxStoreDecorator(story))
  .add('default', () => <TrainingResultPage {...props} />);
