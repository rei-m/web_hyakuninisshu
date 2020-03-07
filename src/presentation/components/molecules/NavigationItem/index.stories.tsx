import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CreateIcon from '@material-ui/icons/Create';
import NavigationItem from './index';

storiesOf('molecules/NavigationItem', module).add('default', () => (
  <NavigationItem
    menuType={'training'}
    renderIcon={() => <CreateIcon style={{ color: '#f00' }} />}
    onClick={action(`onClick`)}
  />
));
