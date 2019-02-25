import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MaterialListFilter } from './index';
import { appContextDecorator } from '@helper/storybook';
import { initialState } from '@src/state/ui/reducers';

storiesOf('organisms/MaterialListFilter', module)
  .addDecorator(story => appContextDecorator(story))
  .add('default', () => (
    <MaterialListFilter
      colors={initialState.karutasFilter.colors}
      kimarijis={initialState.karutasFilter.kimarijis}
      onChangeColor={action(`onChangeColor`)}
      onChangeKimariji={action(`onChangeKimariji`)}
      onClickClose={action('onClickClose')}
    />
  ));
