'use client';

import { SmallMaterialList } from '@/app/components/organisms/SmallMaterialList';

import { useAppSelector } from '@/lib/hooks';
import { selectKarutaList } from '@/lib/features/material/materialSlice';

export const FilteredSmallMaterialList = () => {
  const karutaList = useAppSelector(selectKarutaList);
  return <SmallMaterialList karutaList={karutaList} />;
};
