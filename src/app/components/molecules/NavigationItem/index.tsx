import type { SxAppProps } from '@/theme';

import Box from '@mui/material/Box';
import { ExamIcon, MaterialIcon, OtherIcon, TrainingIcon } from '@/app/components/atoms/MenuIcon';

export type MenuType = 'training' | 'exam' | 'material' | 'other';

export type NavigationItemProps = {
  menuType: MenuType;
  active?: boolean;
  sx?: SxAppProps;
};

const MENU_TYPE_MAP = {
  training: '練習',
  exam: '腕試し',
  material: '資料',
  other: 'その他',
} as const;

const ICON_MAP = {
  training: TrainingIcon,
  exam: ExamIcon,
  material: MaterialIcon,
  other: OtherIcon,
} as const;

const NavigationItem = ({ menuType, active, sx }: NavigationItemProps) => {
  const Icon = ICON_MAP[menuType];
  return (
    <Box
      component="span"
      sx={[
        {
          height: 56,
          color: 'common.white',
          position: 'relative',
          boxSizing: 'border-box',
          width: 'inherit',
          opacity: active ? 1 : 0.8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& svg': {
            mb: '18px',
          },
          '&:after': {
            content: `'${MENU_TYPE_MAP[menuType]}'`,
            bottom: 6,
            position: 'absolute',
            fontSize: 12,
            opacity: 1,
            fontWeight: 600,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Icon style={{ fontSize: '24px' }} />
    </Box>
  );
};

export default NavigationItem;
