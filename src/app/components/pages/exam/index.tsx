'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { PageLayout } from '@/app/components/organisms/PageLayout';
const Ad = dynamic(() => import('@/app/components/organisms/Ad'), { ssr: false });
import { Heading } from '@/app/components/atoms/Heading';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectQuestionState, startExam } from '@/lib/features/question/questionSlice';

import { ROUTING } from '@/configs/routing';

export const ExamClientPage = () => {
  const { state } = useAppSelector(selectQuestionState);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state === 'ready') {
      router.push(ROUTING.examQuestion());
    }
  }, [router, state]);

  return (
    <PageLayout title={`百人一首 - 腕試し -`} isDisplayNav currentMenuType="exam" backUrl={ROUTING.root()}>
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
        <Heading level={2} sx={{ m: 2 }}>
          腕試し
        </Heading>
        <Ad type={`fixed`} sx={{ margin: 'auto', mb: 2 }} />
        <Typography component={'p'} sx={{ pt: 4, pb: 4, pr: 2, pl: 2, fontSize: '1.6rem' }}>
          全百首からランダムに出題されます。
          <br />
          練習の成果を確認しましょう。
        </Typography>
        <Box sx={{ pt: 2 }}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => {
              dispatch(startExam());
            }}
            sx={{ boxShadow: 1 }}
          >
            練習をはじめる
          </Button>
        </Box>
      </Box>
    </PageLayout>
  );
};
