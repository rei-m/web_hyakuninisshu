import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChihayaComa from '@/components/organisms/Alu/ChihayaComa';
import TweetLinkButton from '@/components/molecules/TweetLinkButton';
import Ratio from '@/components/atoms/Ratio';
import { FONT_SIZE } from '@/styles/constants';

export type KarutaPlayingResultProps = {
  children?: React.ReactNode;
  correctCount: number;
  totalCount: number;
  averageAnswerSecond: number;
  onClickBack: () => void;
  onClickRestart: () => void;
};

const KarutaPlayingResult = ({
  children,
  correctCount,
  totalCount,
  averageAnswerSecond,
  onClickRestart,
  onClickBack,
}: KarutaPlayingResultProps) => (
  <Box sx={{ maxWidth: 380, p: 2 }}>
    <Box
      sx={{
        p: 1,
        backgroundColor: 'background.default',
        boxSizing: 'border-box',
        boxShadow: 1,
        borderRadius: 0.5,
      }}
    >
      <Typography component={`div`} sx={{ fontSize: FONT_SIZE.ss, textAlign: 'left' }}>
        正解数
      </Typography>
      <Ratio numerator={correctCount} denominator={totalCount} sx={{ fontSize: FONT_SIZE.l, textAlign: 'center' }} />
    </Box>
    <Box
      sx={{
        p: 1,
        mt: 2,
        backgroundColor: 'background.default',
        boxSizing: 'border-box',
        boxShadow: 1,
        borderRadius: 0.5,
      }}
    >
      <Typography component={`div`} sx={{ fontSize: FONT_SIZE.ss, textAlign: 'left' }}>
        平均回答時間
      </Typography>
      <Typography
        sx={{ fontSize: FONT_SIZE.l, textAlign: 'center' }}
      >{`${averageAnswerSecond.toFixed(2)}秒`}</Typography>
    </Box>
    <Box
      sx={{
        mt: 4,
        backgroundColor: 'background.default',
        borderRadius: 0.5,
        pt: 2,
        pb: 1,
        px: 1,
        boxShadow: 1,
      }}
    >
      <Box>
        <Typography sx={{ fontSize: '1rem', color: 'rgb(60, 62, 61)' }}>
          当サイトは百人一首とちはやふるを応援しています
        </Typography>
      </Box>
      <Box sx={{ mt: 1 }}>
        <a href="https://chihayafund.com/" target="_blank" rel="noopener noreferrer">
          ちはやふる基金
        </a>
      </Box>
      <Box sx={{ mt: 1 }}>
        <ChihayaComa />
      </Box>
    </Box>
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <TweetLinkButton text={`百人一首で ${totalCount}問中 ${correctCount}問 正解しました！`} hashTag={`百人一首`} />
    </Box>
    {children && children}
    {correctCount !== totalCount && (
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Button
          color="inherit"
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onClickRestart}
          sx={{ boxShadow: 1 }}
        >
          間違えた歌の練習をする
        </Button>
      </Box>
    )}
    <Box sx={{ p: 1, textAlign: 'center' }}>
      <Button
        color="inherit"
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={onClickBack}
        sx={{ boxShadow: 1 }}
      >
        メニューに戻る
      </Button>
    </Box>
  </Box>
);

export default KarutaPlayingResult;
