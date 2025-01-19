'use client';

import Typography from '@mui/material/Typography';
import SmallMaterialList from '@/app/components/organisms/SmallMaterialList';

import { useAppSelector } from '@/lib/hooks';
import { selectKarutaList } from '@/lib/features/material/materialSlice';

import { FONT_SIZE } from '@/theme';

const FilteredSmallMaterialList = () => {
  const karutaList = useAppSelector(selectKarutaList);
  return karutaList.length > 0 ? (
    <SmallMaterialList karutaList={karutaList} />
  ) : (
    <Typography sx={{ p: 6, fontSize: FONT_SIZE.m }}>歌が見つかりませんでした。絞り込みを見直してください。</Typography>
  );
};

export default FilteredSmallMaterialList;
