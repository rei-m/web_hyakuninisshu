import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TrainingMenuForm from './index';
import { reduxStoreDecorator } from '@helper/storybook';

storiesOf('organisms/TrainingMenuForm', module)
  .addDecorator(story => reduxStoreDecorator(story))
  .add('default', () => <TrainingMenuForm onSubmit={action('onSubmit')} />);
