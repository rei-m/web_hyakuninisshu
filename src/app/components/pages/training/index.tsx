'use client';

import dynamic from 'next/dynamic';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import PageLayout from '@/app/components/organisms/PageLayout';
import Heading from '@/app/components/atoms/Heading';
import TrainingMenuForm from '@/app/containers/organisms/TrainingMenuForm';
const Ad = dynamic(() => import('@/app/components/organisms/Ad'), { ssr: false });

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
      <Box component={'section'} sx={{ boxSizing: 'border-box', p: 2, width: '100%', textAlign: 'center' }}>
        <Heading level={2} sx={{ m: 2 }}>
          出題設定
        </Heading>
        <Ad type={`fixed`} sx={{ m: 'auto', mb: 2 }} />
        <TrainingMenuForm />
      </Box>
    </PageLayout>
  );
};
