import type { Karuta, QuestionId } from '@/domains/models';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import Fuda from '@/app/components/organisms/Fuda';
import Material from '@/app/components/organisms/Material';

import { useBool } from '@/hooks/useBool';
import { karutaNoToJPNText } from '@/domains/models/KarutaNo';
import { kimarijiToJPNText } from '@/domains/models/Kimariji';

import { FONT_SIZE } from '@/theme';

export type KarutaPlayingCorrectProps = {
  questionId: QuestionId;
  karuta: Karuta;
  isAllAnswered: boolean;
  onClickGoToNext: (questionId: QuestionId) => void;
  onClickGoToResult: () => void;
};

const KarutaPlayingCorrect = ({
  questionId,
  karuta,
  isAllAnswered,
  onClickGoToNext,
  onClickGoToResult,
}: KarutaPlayingCorrectProps) => {
  const [opened, openDialog, closeDialog] = useBool(false);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          m: 'auto',
          width: 160,
        }}
      >
        <Box
          sx={{
            m: '0 auto',
            p: 1,
            border: '1px solid #d3d3d3',
            fontSize: FONT_SIZE.s,
            backgroundColor: 'common.white',
          }}
        >
          <Typography component={'span'} sx={{ fontSize: FONT_SIZE.ss }}>
            {karutaNoToJPNText({ karutaNo: karuta.no })}
          </Typography>
          <Typography component={'span'} sx={{ fontSize: FONT_SIZE.ss, px: 0.5 }}>
            /
          </Typography>
          <Typography component={'span'} sx={{ fontSize: FONT_SIZE.ss }}>
            {kimarijiToJPNText({ kimariji: karuta.kimariji })}
          </Typography>
        </Box>
        <Button
          color="inherit"
          onClick={openDialog}
          sx={{
            fontSize: FONT_SIZE.m,
            paddinpg: 0,
            height: '33px',
            width: '33px',
            minHeight: '33px',
            minWidth: '33px',
            position: 'absolute',
            top: 0,
            right: -48,
            boxShadow: 1,
          }}
        >
          資
        </Button>
      </Box>
      <Fuda karuta={karuta} size="l" sx={{ boxShadow: 1, m: 2 }} />
      {isAllAnswered ? (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowForwardIcon />}
          onClick={onClickGoToResult}
          sx={{ mt: 2, boxShadow: 1 }}
        >
          結果を見る
        </Button>
      ) : (
        <Button
          variant="contained"
          color="inherit"
          startIcon={<ArrowForwardIcon />}
          onClick={() => {
            onClickGoToNext(questionId);
          }}
          sx={{ mt: 2, boxShadow: 1 }}
        >
          次へ進む
        </Button>
      )}
      <Dialog onClose={closeDialog} open={opened}>
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: 'background.default' }}>正解</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ backgroundColor: 'background.default' }}>
          <Material karuta={karuta} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default KarutaPlayingCorrect;
