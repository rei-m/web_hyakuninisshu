import type { Karuta } from '@/domains/models';
import type { SxAppProps } from '@/theme';

import Box from '@mui/material/Box';
import VerticalTxt from '@/app/components/atoms/VerticalTxt';

import { FONT_SIZE } from '@/theme';

type Size = 's' | 'm' | 'l';

export type FudaProps = {
  karuta: Karuta;
  size?: Size;
  sx?: SxAppProps;
};

const RATIO_L = 1.15;
const RATIO_S = 0.875;

const ROOT_STYLE_MAP = {
  s: {
    width: `${175 * RATIO_S}px`,
    height: `${230 * RATIO_S}px`,
    borderWidth: `${5 * RATIO_S}px`,
  },
  m: {
    width: `175px`,
    height: `230px`,
    borderWidth: `5px`,
  },
  l: {
    width: `${230 * RATIO_S}px`,
    height: `${230 * RATIO_L}px`,
    borderWidth: `${5 * RATIO_L}px`,
  },
} as const;

const PHRASE_STYLE_MAP = {
  s: {
    paddingUnit: 5,
    marginRight: 5,
  },
  m: {
    paddingUnit: 7,
    marginRight: 7,
  },
  l: {
    paddingUnit: 8,
    marginRight: 8,
  },
};

const CREATOR_STYLE_MAP = {
  s: {
    fontSize: `${1.3 * RATIO_S}rem`,
    lineHeight: `${1.4 * RATIO_S}rem`,
    marginRight: `${14 * RATIO_S}px`,
  },
  m: {
    fontSize: `1.3rem`,
    lineHeight: `1.4rem`,
    marginRight: `14px`,
  },
  l: {
    fontSize: `${1.3 * RATIO_L}rem`,
    lineHeight: `${1.4 * RATIO_L}rem`,
    marginRight: `${14 * RATIO_L}px`,
  },
};

const Fuda = ({ karuta, size = 'm', sx }: FudaProps) => (
  <Box
    sx={[
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.default',
        borderStyle: 'solid',
        borderColor: 'primary.dark',
        borderRadius: 2,
        fontFamily: 'Sawarabi Mincho',
        width: ROOT_STYLE_MAP[size].width,
        height: ROOT_STYLE_MAP[size].height,
        borderWidth: ROOT_STYLE_MAP[size].borderWidth,
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
      <VerticalTxt fontSize={FONT_SIZE[size]}>{karuta.shoku.kanji}</VerticalTxt>
      <VerticalTxt
        fontSize={FONT_SIZE[size]}
        sx={{
          pt: `${PHRASE_STYLE_MAP[size].paddingUnit * 3}px`,
          mr: `${PHRASE_STYLE_MAP[size].marginRight}px`,
        }}
      >
        {karuta.niku.kanji}
      </VerticalTxt>
      <VerticalTxt
        fontSize={FONT_SIZE[size]}
        sx={{
          pt: `${PHRASE_STYLE_MAP[size].paddingUnit * 6}px`,
          mr: `${PHRASE_STYLE_MAP[size].marginRight}px`,
        }}
      >
        {karuta.sanku.kanji}
      </VerticalTxt>
      <VerticalTxt
        fontSize={FONT_SIZE[size]}
        sx={{
          pt: `${PHRASE_STYLE_MAP[size].paddingUnit * 4}px`,
          mr: `${PHRASE_STYLE_MAP[size].marginRight}px`,
        }}
      >
        {karuta.shiku.kanji}
      </VerticalTxt>
      <VerticalTxt
        fontSize={FONT_SIZE[size]}
        sx={{
          pt: `${PHRASE_STYLE_MAP[size].paddingUnit * 7}px`,
          mr: `${PHRASE_STYLE_MAP[size].marginRight}px`,
        }}
      >
        {karuta.kekku.kanji}
      </VerticalTxt>
      <VerticalTxt
        fontSize={FONT_SIZE[size]}
        sx={{
          alignSelf: 'flex-end',
          fontSize: CREATOR_STYLE_MAP[size].fontSize,
          lineHeight: CREATOR_STYLE_MAP[size].lineHeight,
          mr: CREATOR_STYLE_MAP[size].marginRight,
        }}
      >
        {karuta.creator}
      </VerticalTxt>
    </Box>
  </Box>
);

export default Fuda;
