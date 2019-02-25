import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { appContextDecorator } from '@helper/storybook';
import MainMenuList from './index';

storiesOf('organisms/MainMenuList', module)
  .addDecorator(story => appContextDecorator(story))
  .add('default', () => <MainMenuList />);
