import React from 'react';
import { storiesOf } from '@storybook/react';
import QuestionJudgement from './index';
import { MOCK_KARUTA_1 } from '@helper/mocks/domain/karutas';

storiesOf('molecules/QuestionJudgement', module)
  .addDecorator((story) => <div style={{ height: 100, width: 100 }}>{story()}</div>)
  .add('with correct', () => <QuestionJudgement karuta={MOCK_KARUTA_1} correct={true} />)
  .add('with incorrect', () => <QuestionJudgement karuta={MOCK_KARUTA_1} correct={false} />);
