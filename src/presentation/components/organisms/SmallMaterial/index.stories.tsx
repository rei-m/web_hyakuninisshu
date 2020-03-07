import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SmallMaterial from './index';
import { MOCK_KARUTA_1 } from '@helper/mocks/domain/karutas';

storiesOf('organisms/SmallMaterial', module)
  .add('default', () => <SmallMaterial karuta={MOCK_KARUTA_1} onClick={action('onClick')} />)
  .add('separate space', () => <SmallMaterial karuta={MOCK_KARUTA_1} separate={' '} onClick={action('onClick')} />)
  .add('no image', () => <SmallMaterial karuta={MOCK_KARUTA_1} image={false} onClick={action('onClick')} />);
