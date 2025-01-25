import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SmallMaterial from '@/components/organisms/SmallMaterial';

import type { Karuta } from '@/domains/models';

export type SmallMaterialListProps = {
  karutaList: ReadonlyArray<Karuta>;
};

const SmallMaterialList = ({ karutaList }: SmallMaterialListProps) => (
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
    {karutaList.map((karuta) => (
      <ListItem
        key={karuta.no}
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
        <SmallMaterial karuta={karuta} />
      </ListItem>
    ))}
  </List>
);

export default SmallMaterialList;
