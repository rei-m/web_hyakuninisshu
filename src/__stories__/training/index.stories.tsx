import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxStoreDecorator } from '@helper/storybook';
import TrainingPage from '@src/pages/training';

storiesOf('pages/training', module)
  .addDecorator(story => reduxStoreDecorator(story))
  .add('default', () => <TrainingPage />);
