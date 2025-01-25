import type { ToriFuda } from '@/domains/models';
import type { SxAppProps } from '@/styles/theme';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import VerticalTxt from '@/components/atoms/VerticalTxt';

import { FONT_SIZE } from '@/styles/constants';

type Size = 's' | 'm' | 'l';

const RATIO_MAP = {
  s: 0.875,
  m: 1.0,
  l: 1.15,
} as const;

export type ToriFudaViewProps = {
  toriFuda: ToriFuda;
  thin?: boolean;
  size?: Size;
  sx?: SxAppProps;
  onClick: (toriFuda: ToriFuda) => void;
};

const ToriFudaView = ({ toriFuda, size = 'm', thin = false, sx, onClick }: ToriFudaViewProps) => (
  <ButtonBase
    onClick={() => onClick(toriFuda)}
    sx={[
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.default',
        borderStyle: 'solid',
        borderColor: 'primary.dark',
        borderWidth: `${3 * RATIO_MAP[size]}px`,
        borderRadius: 2,
        height: `${220 * RATIO_MAP[size]}px`,
        paddingLeft: 1,
        paddingRight: 1,
        cursor: 'pointer',
        opacity: thin ? '0.8' : '1',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
      }}
    >
      <VerticalTxt fontSize={FONT_SIZE[size]}>{toriFuda.shiku}</VerticalTxt>
      <VerticalTxt
        fontSize={FONT_SIZE[size]}
        sx={{
          paddingTop: `${8 * 3 * RATIO_MAP[size]}px`,
          marginRight: `${8 * RATIO_MAP[size]}px`,
        }}
      >
        {toriFuda.kekku}
      </VerticalTxt>
    </Box>
  </ButtonBase>
);

export default ToriFudaView;
