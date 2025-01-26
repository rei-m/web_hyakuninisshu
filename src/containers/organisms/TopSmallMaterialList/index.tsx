'use client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SmallMaterial from '@/containers/organisms/SmallMaterial';

import { useAppSelector } from '@/lib/hooks';
import { selectAllKarutaNoList } from '@/lib/features/material/materialSlice';

const TopSmallMaterialList = () => {
  const karutaNoList = useAppSelector(selectAllKarutaNoList);
  return (
    <List
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        '& > li': {
          p: 0,
          width: {
            sm: '49%',
          },
        },
      }}
    >
      {karutaNoList.map((karutaNo) => (
        <ListItem key={karutaNo}>
          <SmallMaterial
            karutaNo={karutaNo}
            separate={` `}
            image={false}
            sx={{
              backgroundColor: 'background.default',
              p: 0,
              ':hover': {
                textDecoration: 'underline',
                textDecorationColor: '#106ba3',
                backgroundColor: '#fffff0',
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TopSmallMaterialList;
