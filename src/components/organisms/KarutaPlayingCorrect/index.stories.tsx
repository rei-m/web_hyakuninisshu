import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { create } from '@helper/factory';
import KarutaPlayingCorrect, { Props } from './index';
import { Karuta } from '@src/types';

const karuta = create<Karuta>('karuta');

const props: Props = {
  karuta,
  isAllAnswered: false,
  onClickGoToNext: action('onClickGoToNext'),
  onClickGoToResult: action('onClickGoToResult'),
};

storiesOf('organisms/KarutaPlayingCorrect', module)
  .add('in answer', () => <KarutaPlayingCorrect {...props} />)
  .add('all answered', () => <KarutaPlayingCorrect {...props} isAllAnswered={true} />);
