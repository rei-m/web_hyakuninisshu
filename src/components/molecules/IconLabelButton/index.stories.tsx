import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { EditButton } from './index';

storiesOf('molecules/IconLabelButton', module)
  .add('with type normal', () => <EditButton>あいこんぼたん</EditButton>)
  .add('with type primary', () => <EditButton type={`accent`}>あいこんぼたん</EditButton>);
