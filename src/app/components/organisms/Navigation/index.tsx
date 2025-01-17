import Link from 'next/link';
import Box from '@mui/material/Box';
import { NavigationItem, MenuType } from '@/app/components/molecules/NavigationItem';
import { WIDTH_SIDE_NAV } from '@/theme';
import { ROUTING } from '@/configs/routing';

import type { SxAppProps } from '@/theme';

export type NavigationProps = {
  currentMenuType?: MenuType;
  sx?: SxAppProps;
};

const LINK_SX: SxAppProps = {
  flexGrow: 1,
  width: '100%',
  '@media screen and (min-width:600px)': {
    flexGrow: 0,
    height: WIDTH_SIDE_NAV,
  },
};

export const Navigation = ({ currentMenuType, sx }: NavigationProps) => (
  <Box
    component={'nav'}
    sx={[
      {
        display: 'flex',
        backgroundColor: 'primary.main',
        boxSizing: 'border-box',
        boxShadow: 1,
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box component={Link} href={ROUTING.training()} sx={LINK_SX}>
      <NavigationItem menuType={'training'} active={currentMenuType === 'training'} />
    </Box>
    <Box component={Link} href={ROUTING.exam()} sx={LINK_SX}>
      <NavigationItem menuType={'exam'} active={currentMenuType === 'exam'} />
    </Box>
    <Box component={Link} href={ROUTING.karutas()} sx={LINK_SX}>
      <NavigationItem menuType={'material'} active={currentMenuType === 'material'} />
    </Box>
    <Box component={Link} href={ROUTING.about()} sx={LINK_SX}>
      <NavigationItem menuType={'other'} active={currentMenuType === 'other'} />
    </Box>
  </Box>
);
