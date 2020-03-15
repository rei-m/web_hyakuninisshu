import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Presenter, PresenterProps } from './index';
import { MOCK_KARUTA_COLLECTION } from '@helper/mocks/domain/karutas';
import { reduxStoreDecorator } from '@helper/storybook';

const props: PresenterProps = {
  karutaCollection: MOCK_KARUTA_COLLECTION,
  filterOpen: false,
  onClickSearch: action('onClickSearch'),
  onClickOverlay: action('onClickOverlay'),
  onClickBack: action('onClickBack'),
};

storiesOf('pages/karutas', module)
  .addDecorator(story => reduxStoreDecorator(story))
  .add('default', () => <Presenter {...props} />);
