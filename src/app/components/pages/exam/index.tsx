'use client';

import dynamic from 'next/dynamic';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import PageLayout from '@/app/components/organisms/PageLayout';
import Heading from '@/app/components/atoms/Heading';
const Ad = dynamic(() => import('@/app/components/organisms/Ad'), { ssr: false });

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectQuestionState, startExam } from '@/lib/features/question/questionSlice';

import { ROUTING } from '@/configs/routing';
import { FONT_SIZE } from '@/theme';

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
      <Box component={'section'} sx={{ boxSizing: 'border-box', p: 2, width: '100%', textAlign: 'center' }}>
        <Heading level={2} sx={{ m: 2 }}>
          腕試し
        </Heading>
        <Ad type={`fixed`} sx={{ margin: 'auto' }} />
        <Typography component={'p'} sx={{ py: 4, pw: 2, mt: 2, fontSize: FONT_SIZE.m }}>
          全百首からランダムに出題されます。
          <br />
          練習の成果を確認しましょう。
        </Typography>
        <Box sx={{ py: 2 }}>
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
