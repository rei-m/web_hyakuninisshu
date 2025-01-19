import type { YomiFuda } from '@/domains/models';
import type { SxAppProps } from '@/theme';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Phrase, { SPACE } from './Phrase';
import { FONT_SIZE } from '@/theme';

type Size = 's' | 'm' | 'l';

const RATIO_L = 1.15;
const RATIO_M = 1.0;
const RATIO_S = 0.875;
const RATIO_MAP = {
  s: RATIO_S,
  m: RATIO_M,
  l: RATIO_L,
} as const;

export type YomiFudaViewProps = {
  yomiFuda: YomiFuda;
  answered: boolean;
  duration: number;
  size?: Size;
  sx?: SxAppProps;
};

export type YomiFudaViewPresenterProps = {
  firstLine: string;
  secondLine: string;
  thirdLine: string;
  duration: number;
  size?: Size;
  sx?: SxAppProps;
  onAnimationEnd: () => void;
};

export type YomiFudaViewContainerProps = YomiFudaViewProps & { presenter: React.FC<YomiFudaViewPresenterProps> };

const adjustDisplayText = (text: string, startIndex: number, currentPosition: number) => {
  if (currentPosition < startIndex) {
    return Array.from(Array(text.length).keys())
      .map(() => SPACE)
      .join('');
  }
  const line = currentPosition > startIndex ? text.substring(0, currentPosition - startIndex) : '';
  const mod = text.length - (currentPosition - startIndex);
  const linePad =
    mod > 0
      ? Array.from(Array(mod).keys())
          .map(() => SPACE)
          .join('')
      : '';
  return line + linePad;
};

export const YomiFudaPresenter = ({
  firstLine,
  secondLine,
  thirdLine,
  duration,
  size = 'm',
  sx,
  onAnimationEnd,
}: YomiFudaViewPresenterProps) => (
  <Box
    sx={[
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffff0',
        borderStyle: 'solid',
        borderColor: 'primary.dark',
        borderWidth: `${5 * RATIO_MAP[size]}px`,
        borderRadius: 2,
        width: `${120 * RATIO_MAP[size]}px`,
        height: `${205 * RATIO_MAP[size]}px`,
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
      <Phrase text={firstLine} duration={duration} fontSize={FONT_SIZE[size]} onAnimationEnd={onAnimationEnd} />
      <Phrase
        text={secondLine}
        duration={duration}
        fontSize={FONT_SIZE[size]}
        onAnimationEnd={onAnimationEnd}
        sx={{
          paddingTop: `${8 * 3 * RATIO_MAP[size]}px`,
          marginLeft: `${8 * RATIO_MAP[size]}px`,
          marginRight: `${8 * RATIO_MAP[size]}px`,
        }}
      />
      <Phrase
        text={thirdLine}
        duration={duration}
        fontSize={FONT_SIZE[size]}
        onAnimationEnd={onAnimationEnd}
        sx={{
          paddingTop: `${8 * 6 * RATIO_MAP[size]}px`,
        }}
      />
    </Box>
  </Box>
);

export const YomiFudaContainer = ({
  yomiFuda,
  answered,
  duration,
  size,
  sx,
  presenter,
}: YomiFudaViewContainerProps) => {
  const { shoku, niku, sanku } = yomiFuda;
  const durationOrAnswered = answered ? 0 : duration;

  const [position, setPosition] = useState(duration === 0 ? shoku.length + niku.length + sanku.length : 1);

  const firstLine = adjustDisplayText(shoku, 0, position);
  const secondLine = adjustDisplayText(niku, shoku.length, position);
  const thirdLine = adjustDisplayText(sanku, shoku.length + niku.length, position);

  const onAnimationEnd = () => {
    if (answered) {
      return;
    }
    setPosition(position + 1);
  };

  return presenter({
    firstLine,
    secondLine,
    thirdLine,
    duration: durationOrAnswered,
    size,
    sx,
    onAnimationEnd,
  });
};

const YomiFudaView = (props: YomiFudaViewProps) => <YomiFudaContainer presenter={YomiFudaPresenter} {...props} />;

export default YomiFudaView;
