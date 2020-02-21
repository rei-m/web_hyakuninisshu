import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SmallMaterial from './index';
import { MOCK_FIRST_KARUTA } from '@helper/mocks/domain/karutas';

storiesOf('organisms/SmallMaterial', module)
  .add('default', () => <SmallMaterial karuta={MOCK_FIRST_KARUTA} onClick={action('onClick')} />)
  .add('separate space', () => <SmallMaterial karuta={MOCK_FIRST_KARUTA} separate={' '} onClick={action('onClick')} />)
  .add('no image', () => <SmallMaterial karuta={MOCK_FIRST_KARUTA} image={false} onClick={action('onClick')} />);
