import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import { VerticalTxt } from '@/app/components/atoms/VerticalTxt';

import type { ToriFuda } from '@/domains/models';
import type { SxAppProps } from '@/theme';

type Size = 's' | 'm' | 'l';

const RATIO_L = 1.15;
const RATIO_M = 1.0;
const RATIO_S = 0.875;
const ratioMap = {
  s: RATIO_S,
  m: RATIO_M,
  l: RATIO_L,
} as const;
const FONT_SIEZ_MAP = {
  s: '1.4rem',
  m: '1.6rem',
  l: '1.8rem',
} as const;

export type ToriFudaViewProps = {
  toriFuda: ToriFuda;
  thin?: boolean;
  size?: Size;
  sx?: SxAppProps;
  onClick: (toriFuda: ToriFuda) => void;
};

export const ToriFudaView = ({ toriFuda, size = 'm', thin = false, sx, onClick }: ToriFudaViewProps) => (
  <ButtonBase
    onClick={() => onClick(toriFuda)}
    sx={[
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffff0',
        borderStyle: 'solid',
        borderColor: 'primary.dark',
        borderWidth: `${3 * ratioMap[size]}px`,
        borderRadius: 2,
        height: `${220 * ratioMap[size]}px`,
        paddingLeft: 1,
        paddingRight: 1,
        fontFamily: '"Sawarabi Mincho"',
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
      <VerticalTxt fontSize={FONT_SIEZ_MAP[size]}>{toriFuda.shiku}</VerticalTxt>
      <VerticalTxt
        fontSize={FONT_SIEZ_MAP[size]}
        sx={{
          paddingTop: `${8 * 3 * ratioMap[size]}px`,
          marginRight: `${8 * ratioMap[size]}px`,
        }}
      >
        {toriFuda.kekku}
      </VerticalTxt>
    </Box>
  </ButtonBase>
);
