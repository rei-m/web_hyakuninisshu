import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import HeaderItem from './index';
import { TrainingIcon } from '@src/components/atoms/MenuIcon';

storiesOf('molecules/HeaderItem', module).add('default', () => (
  <HeaderItem renderIcon={() => <TrainingIcon style={{ color: '#f00' }} />} onClick={action(`onClick`)} />
));
