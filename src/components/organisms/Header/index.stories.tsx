import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Header from './index';

storiesOf('organisms/Header', module)
  .add('default', () => <Header title={`へっだー`} />)
  .add('with back button', () => <Header title={`へっだー`} onClickBack={action('onClickBack')} />)
  .add('with search button', () => <Header title={`へっだー`} onClickSearch={action('onClickSearch')} />);
