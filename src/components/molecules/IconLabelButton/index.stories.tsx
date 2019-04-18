import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconLabelButton from './index';

storiesOf('molecules/IconLabelButton', module)
  .add('with type normal', () => (
    <IconLabelButton type={`normal`} renderIcon={() => <ArrowBackIcon />}>
      あいこんぼたん
    </IconLabelButton>
  ))
  .add('with type primary', () => (
    <IconLabelButton type={`primary`} renderIcon={() => <ArrowBackIcon />}>
      あいこんぼたん
    </IconLabelButton>
  ));
