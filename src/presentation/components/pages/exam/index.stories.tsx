import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Presenter } from './index';

storiesOf('pages/exam', module).add('default', () => (
  <Presenter onClickStartExam={action('onClickStartExam')} onClickBack={action('onClickBack')} />
));
