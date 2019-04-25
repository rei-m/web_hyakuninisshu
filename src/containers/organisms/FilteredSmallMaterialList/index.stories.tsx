import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { FilteredSmallMaterialList } from './index';
import { create } from '@helper/factory';
import { Karuta } from '@src/types';

const karutas = [...Array(100).keys()].map(i =>
  create<Karuta>('karuta', {
    no: i + 1,
  })
);

storiesOf('organisms/FilteredSmallMaterialList', module)
  .add('default', () => <FilteredSmallMaterialList karutas={karutas} />)
  .add('empty', () => <FilteredSmallMaterialList karutas={[]} />);
