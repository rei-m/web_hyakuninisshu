import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxStoreDecorator } from '@helper/storybook';
import ExamResultPage, { Props } from '@src/pages/exam/result';
import { QuestionState } from '@src/enums';

const props: Props = {
  questionState: QuestionState.Finished,
};

storiesOf('pages/exam/result', module)
  .addDecorator(story => reduxStoreDecorator(story))
  .add('default', () => <ExamResultPage {...props} />);
