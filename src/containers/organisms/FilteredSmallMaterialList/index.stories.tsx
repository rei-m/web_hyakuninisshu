import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { FilteredSmallMaterialListPresenter } from './index';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';

const karutas = [...Array(100).keys()].map(i =>
  create<Karuta>('karuta', {
    no: i + 1,
  })
);

storiesOf('organisms/FilteredSmallMaterialList', module)
  .add('default', () => <FilteredSmallMaterialListPresenter karutas={karutas} />)
  .add('empty', () => <FilteredSmallMaterialListPresenter karutas={[]} />);
