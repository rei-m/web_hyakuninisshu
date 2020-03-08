import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ToriFuda from './index';
import { MOCK_TORIFUDA_1 } from '@helper/mocks/state/questions';

const props = {
  toriFuda: MOCK_TORIFUDA_1,
  onClick: action('onClick'),
};

storiesOf('molecules/ToriFuda', module)
  .add('default', () => <ToriFuda {...props} />)
  .add('with thin style', () => <ToriFuda {...props} thin={true} />)
  .add('with size s', () => <ToriFuda {...props} size={`s`} />)
  .add('with size m', () => <ToriFuda {...props} size={`m`} />)
  .add('with size l', () => <ToriFuda {...props} size={`l`} />);
