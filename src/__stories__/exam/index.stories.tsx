import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { appContextDecorator } from '@helper/storybook';
import ExamPage from '@src/pages/exam';

storiesOf('pages/exam', module)
  .addDecorator(story => appContextDecorator(story))
  .add('default', () => <ExamPage />);
