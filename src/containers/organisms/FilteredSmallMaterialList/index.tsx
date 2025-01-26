'use client';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SmallMaterial from '@/containers/organisms/SmallMaterial';

import { useAppSelector } from '@/lib/hooks';
import { selectFilteredKarutaNoList } from '@/lib/features/material/materialSlice';

import { FONT_SIZE } from '@/styles/constants';

const FilteredSmallMaterialList = () => {
  const karutaNoList = useAppSelector(selectFilteredKarutaNoList);
  return karutaNoList.length > 0 ? (
    <List
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
      }}
    >
      {karutaNoList.map((karutaNo) => (
        <ListItem
          key={karutaNo}
          disablePadding
          sx={{
            maxWidth: 380,
            width: '100%',
            boxShadow: 1,
            my: 1,
            mx: {
              sm: 1,
            },
          }}
        >
          <SmallMaterial karutaNo={karutaNo} />
        </ListItem>
      ))}
    </List>
  ) : (
    <Typography sx={{ p: 6, fontSize: FONT_SIZE.m }}>歌が見つかりませんでした。絞り込みを見直してください。</Typography>
  );
};

export default FilteredSmallMaterialList;
