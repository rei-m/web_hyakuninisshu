import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MaterialListFilterPresenter } from './index';
import { initialState } from '@src/state/ui/reducers';

storiesOf('organisms/MaterialListFilter', module).add('default', () => (
  <MaterialListFilterPresenter
    colors={initialState.karutasFilter.colors}
    kimarijis={initialState.karutasFilter.kimarijis}
    onChangeColor={action(`onChangeColor`)}
    onChangeKimariji={action(`onChangeKimariji`)}
    onClickClose={action('onClickClose')}
  />
));
