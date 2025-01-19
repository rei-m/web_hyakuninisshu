'use client';

import Box from '@mui/material/Box';
import PageLayout from '@/app/components/organisms/PageLayout';
import KarutaPlayingContainer from '@/app/containers/organisms/KarutaPlayingContainer';

import { useAppSelector } from '@/lib/hooks';
import { selectCondition } from '@/lib/features/question/questionSlice';

import { HEIGHT_HEADER, HEIGHT_HEADER_WIDE } from '@/theme';
import { ROUTING } from '@/configs/routing';

export const TrainingQuestionClientPage = () => {
  const trainingCondition = useAppSelector(selectCondition);
  return (
    <PageLayout
      title={`百人一首 - 練習 -`}
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
          kamiNoKuStyle={trainingCondition.kamiNoKuStyle}
          shimoNoKuStyle={trainingCondition.shimoNoKuStyle}
          questionAnim={trainingCondition.questionAnim}
          resultUrl={ROUTING.trainingResult()}
        />
      </Box>
    </PageLayout>
  );
};
