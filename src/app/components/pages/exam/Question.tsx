'use client';

import Box from '@mui/material/Box';
import { PageLayout } from '@/app/components/organisms/PageLayout';
import { KarutaPlayingContainer } from '@/app/containers/organisms/KarutaPlayingContainer';
import { HEIGHT_HEADER, HEIGHT_HEADER_WIDE } from '@/theme';
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
        padding: 2,
        width: '100%',
        minHeight: `calc(100vh - ${HEIGHT_HEADER})`,
        backgroundImage: `url(/question/tatami_part.png)`,
        '@media screen and (min-width:600px)': {
          minHeight: `calc(100vh - ${HEIGHT_HEADER_WIDE})`,
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
