import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ToriFuda from './index';
import { create } from '@helper/factory';
import { ToriFuda as ToriFudaType } from '@src/types';

const toriFuda = create<ToriFudaType>('toriFuda');

const props = {
  toriFuda,
  onClick: action('onClick'),
};

storiesOf('molecules/ToriFuda', module)
  .add('default', () => <ToriFuda {...props} />)
  .add('with thin style', () => <ToriFuda {...props} thin={true} />)
  .add('with size s', () => <ToriFuda {...props} size={`s`} />)
  .add('with size m', () => <ToriFuda {...props} size={`m`} />)
  .add('with size l', () => <ToriFuda {...props} size={`l`} />);
