import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { appContextDecorator } from '@helper/storybook';
import NotFoundPage from '@src/pages/404';

storiesOf('pages/404', module)
  .addDecorator(story => appContextDecorator(story))
  .add('default', () => <NotFoundPage />);
