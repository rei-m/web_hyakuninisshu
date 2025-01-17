'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { PageLayout } from '@/app/components/organisms/PageLayout';
import { KarutaPlayingResult } from '@/app/components/organisms/KarutaPlayingResult';
import { Material } from '@/app/components/organisms/Material';
import { Ad } from '@/app/components/organisms/Ad';
import { QuestionJudgement } from '@/app/components/molecules/QuestionJudgement';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { restartTraining, selectQuestionResult } from '@/lib/features/question/questionSlice';

import { HEIGHT_HEADER, HEIGHT_HEADER_WIDE } from '@/theme';
import { ROUTING } from '@/configs/routing';

import type { Karuta } from '@/domains/models';

export const ExamResultClientPage = () => {
  const { state, result } = useAppSelector(selectQuestionResult);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedKaruta, setKaruta] = useState<Karuta>();

  useEffect(() => {
    if (state === 'ready') {
      router.replace(ROUTING.examQuestion());
    }
  }, [router, state]);

  return (
    <PageLayout
      title={`百人一首 - 練習結果 -`}
      isDisplayNav={false}
      currentMenuType="training"
      backUrl={ROUTING.trainingQuestion()}
    >
      <Box
        component={'section'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          boxSizing: 'border-box',
          padding: 2,
          width: '100%',
          minHeight: `calc(100vh - ${HEIGHT_HEADER})`,
          backgroundImage: `url(/question/tatami_part.png)`,
          '@media screen and (min-width:600px)': {
            minHeight: `calc(100vh - ${HEIGHT_HEADER_WIDE})`,
          },
        }}
      >
        <Ad type={`responsive`} />
        {state === 'finished' && !!result ? (
          <KarutaPlayingResult
            totalCount={result.totalCount}
            correctCount={result.correctCount}
            averageAnswerSecond={result.averageAnswerSecond}
            onClickRestart={() => {
              dispatch(restartTraining());
            }}
            onClickBack={() => {
              router.replace(ROUTING.exam());
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                backgroundColor: '#fffff0',
                boxSizing: 'border-box',
                boxShadow: 1,
                borderRadius: 0.5,
                mt: 2,
                mb: 2,
              }}
            >
              {result.answerList.map((answer) => (
                <QuestionJudgement
                  key={answer.correctKaruta.no}
                  karuta={answer.correctKaruta}
                  correct={answer.isCorrect}
                  onClick={setKaruta}
                  sx={{ width: 64, height: 64 }}
                />
              ))}
              <Dialog onClose={() => setKaruta(undefined)} open={!!selectedKaruta}>
                <DialogTitle sx={{ m: 0, p: 2 }}>正解</DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={() => setKaruta(undefined)}
                  sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>{selectedKaruta && <Material karuta={selectedKaruta} />}</DialogContent>
              </Dialog>
            </Box>
          </KarutaPlayingResult>
        ) : state === 'ready' ? (
          <CircularProgress sx={{ width: 64, height: 64 }} />
        ) : (
          <Box
            sx={{
              backgroundColor: '#fffff0',
              padding: 4,
              borderRadius: 4,
            }}
          >
            <Typography role={`error`}>解答の集計に失敗しました。。。前の画面からやり直してください。</Typography>
          </Box>
        )}
        <Ad type={`responsive`} />
      </Box>
    </PageLayout>
  );
};