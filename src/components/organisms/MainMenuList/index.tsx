import Box from '@mui/material/Box';
import MenuLink from '@/components/molecules/MenuLink';
import { ExamIcon, MaterialIcon, TrainingIcon } from '@/components/atoms/MenuIcon';
import { ROUTING } from '@/configs/routing';

import type { SxAppProps } from '@/styles/theme';

const MENU_LINK_SX: SxAppProps = {
  m: 2,
  boxShadow: 1,
  width: {
    sm: 224,
  },
  flexGrow: {
    xs: 1,
    sm: 0,
  },
};

const MainMenuList = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: {
        xs: 'column',
        sm: 'row',
      },
    }}
  >
    <MenuLink
      href={ROUTING.training()}
      icon={<TrainingIcon />}
      name={`練習`}
      description={`様々な条件を組み合わせて出題範囲を指定できます。ご自身の習熟度に合わせて効率よく練習できます。`}
      sx={MENU_LINK_SX}
    />
    <MenuLink
      href={ROUTING.exam()}
      icon={<ExamIcon />}
      name={`腕試し`}
      description={`自身のある方は腕試しに挑戦しましょう。百首通しでランダムに出題されます。`}
      sx={MENU_LINK_SX}
    />
    <MenuLink
      href={ROUTING.karutas()}
      icon={<MaterialIcon />}
      name={`資料`}
      description={`百人一首の詳細な情報を閲覧できます。決まり字や歌の現代語訳などを確認することができます。`}
      sx={MENU_LINK_SX}
    />
  </Box>
);

export default MainMenuList;
