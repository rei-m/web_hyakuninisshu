'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import { PageLayout } from '@/app/components/organisms/PageLayout';
import { Ad } from '@/app/components/organisms/Ad';
import { Heading } from '@/app/components/atoms/Heading';
import { TrainingMenuForm } from '@/app/containers/organisms/TrainingMenuForm';

import { useAppSelector } from '@/lib/hooks';
import { selectQuestionState } from '@/lib/features/question/questionSlice';

import { ROUTING } from '@/configs/routing';

export const TrainingClientPage = () => {
  const { state } = useAppSelector(selectQuestionState);
  const router = useRouter();

  useEffect(() => {
    if (state === 'ready') {
      router.push(ROUTING.trainingQuestion());
    }
  }, [router, state]);

  return (
    <PageLayout title={`百人一首 - 練習 -`} isDisplayNav currentMenuType="training" backUrl={ROUTING.root()}>
      <Box
        component={'section'}
        sx={{
          boxSizing: 'border-box',
          padding: 2,
          width: '100%',
          backgroundColor: '#fffff0',
          textAlign: 'center',
        }}
      >
        <Heading level={2} sx={{ margin: 2 }}>
          出題設定
        </Heading>
        <Ad type={`fixed`} sx={{ margin: 'auto', mb: 2 }} />
        <TrainingMenuForm />
      </Box>
    </PageLayout>
  );
};