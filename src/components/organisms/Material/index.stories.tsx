import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';
import Material from './index';

const karuta = create<Karuta>('karuta', {
  no: 1,
});

storiesOf('organisms/Material', module).add('default', () => <Material karuta={karuta} />);
