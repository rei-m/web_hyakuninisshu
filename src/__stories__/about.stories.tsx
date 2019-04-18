import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { appContextDecorator } from '@helper/storybook';
import AboutPage from '@src/pages/about';

storiesOf('pages/about', module)
  .addDecorator(story => appContextDecorator(story))
  .add('default', () => <AboutPage />);
