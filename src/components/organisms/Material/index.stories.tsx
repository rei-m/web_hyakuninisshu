import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { create } from '@helper/factory';
import { appContextDecorator } from '@helper/storybook';
import { Karuta } from '@src/types';
import Material from './index';

const karuta = create<Karuta>('karuta', {
  no: 1,
});

storiesOf('organisms/Material', module)
  .addDecorator(story => appContextDecorator(story))
  .add('default', () => <Material karuta={karuta} />);
