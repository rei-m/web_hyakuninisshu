import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { appContextDecorator, reduxStoreDecorator } from '@helper/storybook';
import TrainingResultPage, { Props } from '@src/pages/training/result';
import { QuestionState } from '@src/enums';

const props: Props = {
  questionState: QuestionState.Finished,
};

storiesOf('pages/training/result', module)
  .addDecorator(story => appContextDecorator(story))
  .addDecorator(story => reduxStoreDecorator(story))
  .add('default', () => <TrainingResultPage {...props} />);
