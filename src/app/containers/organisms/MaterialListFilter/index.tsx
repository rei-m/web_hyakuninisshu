'use client';

import MaterialListFilterView from '@/app/components/organisms/MaterialListFilterView';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  closeFilter,
  selectFilter,
  toggleKarutasColor,
  toggleKarutasKimariji,
} from '@/lib/features/material/materialSlice';

import type { Color, Kimariji } from '@/domains/models';

const MaterialListFilter = () => {
  const dispatch = useAppDispatch();
  const karutasFilter = useAppSelector(selectFilter);

  return (
    <MaterialListFilterView
      {...karutasFilter}
      onChangeColor={(color: Color, checked: boolean) => {
        dispatch(toggleKarutasColor({ color, checked }));
      }}
      onChangeKimariji={(kimariji: Kimariji, checked: boolean) => {
        dispatch(toggleKarutasKimariji({ kimariji, checked }));
      }}
      onClickClose={() => {
        dispatch(closeFilter());
      }}
    />
  );
};

export default MaterialListFilter;
