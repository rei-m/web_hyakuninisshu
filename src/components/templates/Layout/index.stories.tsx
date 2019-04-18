import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { appContextDecorator } from '@helper/storybook';
import Layout, { Props } from './index';

const props: Props = {
  title: 'れいあうと',
  isDisplayNav: false,
};

storiesOf('templates/Layout', module)
  .addDecorator(story => appContextDecorator(story))
  .add('default', () => <Layout {...props} />)
  .add('with navigation', () => <Layout {...props} isDisplayNav={true} />)
  .add('with back button', () => <Layout {...props} isDisplayNav={true} onClickBack={action('onClickBack')} />)
  .add('with search button', () => <Layout {...props} isDisplayNav={true} onClickSearch={action('onClickSearch')} />);
