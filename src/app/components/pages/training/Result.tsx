'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { PageLayout } from '@/app/components/organisms/PageLayout';
import { KarutaPlayingResult } from '@/app/components/organisms/KarutaPlayingResult';
import { Ad } from '@/app/components/organisms/Ad';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { restartTraining, selectQuestionResult } from '@/lib/features/question/questionSlice';

import { HEIGHT_HEADER, HEIGHT_HEADER_WIDE } from '@/theme';
import { ROUTING } from '@/configs/routing';

export const TrainingResultClientPage = () => {
  const { state, result } = useAppSelector(selectQuestionResult);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (state === 'ready') {
      router.replace(ROUTING.trainingQuestion());
    }
  }, [router, state]);

  return (
    <PageLayout
      title={`百人一首 - 練習結果 -`}
      isDisplayNav={false}
      currentMenuType="training"
      backUrl={ROUTING.training()}
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
              router.replace(ROUTING.training());
            }}
          />
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
