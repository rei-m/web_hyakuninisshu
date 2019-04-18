import * as React from 'react';
import { storiesOf } from '@storybook/react';
import QuestionJudgement from './index';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';
import { appContextDecorator } from '@helper/storybook';

const karuta = create<Karuta>('karuta', {
  no: 1,
});

storiesOf('molecules/QuestionJudgement', module)
  .addDecorator(story => <div style={{ height: 100, width: 100 }}>{appContextDecorator(story)}</div>)
  .add('with correct', () => <QuestionJudgement karuta={karuta} correct={true} />)
  .add('with incorrect', () => <QuestionJudgement karuta={karuta} correct={false} />);
