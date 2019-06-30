import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxStoreDecorator } from '@helper/storybook';
import { ExamResultPagePresenter, PresenterProps } from '@src/pages/exam/result';
import { QuestionState } from '@src/enums';

const props: PresenterProps = {
  questionState: QuestionState.Finished,
};

storiesOf('pages/exam/result', module)
  .addDecorator(story => reduxStoreDecorator(story))
  .add('default', () => <ExamResultPagePresenter {...props} />);
