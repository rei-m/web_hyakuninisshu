import React from 'react';
import { storiesOf } from '@storybook/react';
import { ExamIcon, MaterialIcon, OtherIcon, TrainingIcon } from './index';

storiesOf('atoms/MenuIcon', module)
  .add('TrainingIcon', () => <TrainingIcon />)
  .add('ExamIcon', () => <ExamIcon />)
  .add('MaterialIcon', () => <MaterialIcon />)
  .add('OtherIcon', () => <OtherIcon />);
