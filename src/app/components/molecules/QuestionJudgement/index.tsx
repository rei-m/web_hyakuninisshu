import type { Karuta } from '@/domains/models';
import type { SxAppProps } from '@/theme';

import Image from 'next/image';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { karutaNoToJPNText } from '@/domains/models/KarutaNo';

import CheckCorrect from '@/assets/images/question/check_correct.png';
import CheckIncorrect from '@/assets/images/question/check_incorrect.png';

import { FONT_SIZE } from '@/theme';

export type QuestionJudgementProps = {
  karuta: Karuta;
  correct: boolean;
  sx?: SxAppProps;
  onClick: (karuta: Karuta) => void;
};

const QuestionJudgement = ({ karuta, correct, sx, onClick }: QuestionJudgementProps) => (
  <ButtonBase
    onClick={() => {
      onClick(karuta);
    }}
    sx={[
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Typography component={'span'} sx={{ fontSize: FONT_SIZE.ss }}>
      {karutaNoToJPNText({ karutaNo: karuta.no })}
    </Typography>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Image src={correct ? CheckCorrect : CheckIncorrect} alt={correct ? '正解' : '不正解'} width={55} height={55} />
    </Box>
  </ButtonBase>
);

export default QuestionJudgement;
