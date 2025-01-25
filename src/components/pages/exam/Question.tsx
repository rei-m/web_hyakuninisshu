'use client';

import Box from '@mui/material/Box';
import PageLayout from '@/components/organisms/PageLayout';
import KarutaPlayingContainer from '@/containers/organisms/KarutaPlayingContainer';

import { HEIGHT_HEADER, HEIGHT_HEADER_WIDE } from '@/styles/constants';
import { ROUTING } from '@/configs/routing';

export const ExamQuestionClientPage = () => (
  <PageLayout title={`百人一首 - 腕試し -`} isDisplayNav={false} currentMenuType="exam" backUrl={ROUTING.exam()}>
    <Box
      component={'section'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        boxSizing: 'border-box',
        p: 2,
        width: '100%',
        backgroundImage: `url(/question/tatami_part.png)`,
        minHeight: {
          xs: `calc(100vh - ${HEIGHT_HEADER})`,
          sm: `calc(100vh - ${HEIGHT_HEADER_WIDE})`,
        },
      }}
    >
      <KarutaPlayingContainer
        kamiNoKuStyle={'kanji'}
        shimoNoKuStyle={'kana'}
        questionAnim={'normal'}
        resultUrl={ROUTING.examResult()}
      />
    </Box>
  </PageLayout>
);
