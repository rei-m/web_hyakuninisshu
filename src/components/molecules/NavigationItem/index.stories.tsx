import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NavigationItem from './index';
import { TrainingIcon } from '@src/components/atoms/MenuIcon';
import { MenuType } from '@src/enums';

storiesOf('molecules/NavigationItem', module).add('default', () => (
  <NavigationItem
    menuType={MenuType.Training}
    renderIcon={() => <TrainingIcon style={{ color: '#f00' }} />}
    onClick={action(`onClick`)}
  />
));
