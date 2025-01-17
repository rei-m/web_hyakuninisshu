import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { SmallMaterial } from '@/app/components/organisms/SmallMaterial';

import type { Karuta } from '@/domains/models';

export type SmallMaterialListProps = {
  karutaList: ReadonlyArray<Karuta>;
};

export const SmallMaterialList = ({ karutaList }: SmallMaterialListProps) => (
  <List
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      flexDirection: 'column',
      '@media screen and (min-width: 600px)': {
        flexDirection: 'row',
      },
    }}
  >
    {karutaList.map((karuta) => (
      <ListItem
        key={karuta.no}
        disablePadding
        sx={{
          maxWidth: 380,
          width: '100%',
          marginTop: 1,
          marginBottom: 1,
          boxShadow: 1,
          '@media screen and (min-width: 600px)': {
            margin: 1,
          },
        }}
      >
        <SmallMaterial karuta={karuta} />
      </ListItem>
    ))}
  </List>
);
