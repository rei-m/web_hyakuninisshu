import * as React from 'react';
import { storiesOf } from '@storybook/react';
import MenuLink from './index';
import { appContextDecorator } from '@helper/storybook';
import CreateIcon from '@material-ui/icons/Create';

storiesOf('molecules/MenuLink', module)
  .addDecorator(story => appContextDecorator(story))
  .add('default', () => <MenuLink to={`/`} icon={<CreateIcon />} name={`練習`} description={`練習できるよ`} />);
