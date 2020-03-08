import React from 'react';
import { storiesOf } from '@storybook/react';
import { FilteredSmallMaterialListPresenter } from './index';
import { MOCK_ALL_KARUTA_LIST } from '@helper/mocks/domain/karutas';

storiesOf('organisms/FilteredSmallMaterialList', module)
  .add('default', () => <FilteredSmallMaterialListPresenter karutas={MOCK_ALL_KARUTA_LIST} />)
  .add('empty', () => <FilteredSmallMaterialListPresenter karutas={[]} />);
