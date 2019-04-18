import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { appContextDecorator, reduxStoreDecorator } from '@helper/storybook';
import TrainingPage from '@src/pages/training';

storiesOf('pages/training', module)
  .addDecorator(story => appContextDecorator(story))
  .addDecorator(story => reduxStoreDecorator(story))
  .add('default', () => <TrainingPage />);
