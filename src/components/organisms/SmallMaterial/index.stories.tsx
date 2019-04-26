import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { create } from '@helper/factory';
import SmallMaterial from './index';
import { Karuta } from '@src/types';

const karuta = create<Karuta>('karuta', {
  no: 1,
});

storiesOf('organisms/SmallMaterial', module)
  .add('default', () => <SmallMaterial karuta={karuta} onClick={action('onClick')} />)
  .add('separate space', () => <SmallMaterial karuta={karuta} separate={' '} onClick={action('onClick')} />)
  .add('no image', () => <SmallMaterial karuta={karuta} image={false} onClick={action('onClick')} />);
