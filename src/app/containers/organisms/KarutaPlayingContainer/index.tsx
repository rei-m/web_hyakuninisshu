'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { KarutaPlaying } from '@/app/components/organisms/KarutaPlaying';
import { KarutaPlayingCorrect } from '@/app/components/organisms/KarutaPlayingCorrect';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  answerQuestion,
  confirmCorrect,
  finishQuestion,
  openNextQuestion,
  selectQuestionState,
  startQuestion,
} from '@/lib/features/question/questionSlice';
import { conditionAnimToDulation } from '@/domains/models/TrainingCondition';

import type { TrainingConditionAnim, TrainingConditionDisplayStyle } from '@/domains/models';

export type KarutaPlayingContainerProps = {
  kamiNoKuStyle: TrainingConditionDisplayStyle;
  shimoNoKuStyle: TrainingConditionDisplayStyle;
  questionAnim: TrainingConditionAnim;
  resultUrl: string;
};

export const KarutaPlayingContainer = ({
  kamiNoKuStyle,
  shimoNoKuStyle,
  questionAnim,
  resultUrl,
}: KarutaPlayingContainerProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { state, currentQuestion, currentPosition, totalCount } = useAppSelector(selectQuestionState);

  useEffect(() => {
    if (currentQuestion?.questionId) {
      dispatch(
        startQuestion({
          questionId: currentQuestion.questionId,
          kamiNoKuStyle,
          shimoNoKuStyle,
          startTime: new Date().getTime(),
        })
      );
    }
  }, [currentQuestion?.questionId, kamiNoKuStyle, shimoNoKuStyle, dispatch]);

  useEffect(() => {
    if (state == 'finished') {
      router.replace(resultUrl);
    }
  }, [resultUrl, router, state]);

  return currentQuestion ? (
    currentQuestion.content ? (
      state === 'playing' ? (
        <KarutaPlaying
          questionId={currentQuestion.questionId}
          yomiFuda={currentQuestion.content.yomiFuda}
          toriFudaList={currentQuestion.content.toriFudaList}
          totalCount={totalCount}
          currentPosition={currentPosition}
          duration={conditionAnimToDulation({ anim: questionAnim })}
          answer={currentQuestion.answer}
          onClickToriFuda={(questionId, toriFuda) => {
            dispatch(answerQuestion({ questionId, toriFuda, answerTime: new Date().getTime() }));
          }}
          onClickResult={() => {
            dispatch(confirmCorrect());
          }}
        />
      ) : state === 'confirm' ? (
        <KarutaPlayingCorrect
          questionId={currentQuestion.questionId}
          karuta={currentQuestion.answer!.correctKaruta}
          isAllAnswered={totalCount === currentPosition}
          onClickGoToNext={() => {
            dispatch(openNextQuestion());
          }}
          onClickGoToResult={() => {
            dispatch(finishQuestion());
          }}
        />
      ) : (
        <></>
      )
    ) : (
      <CircularProgress sx={{ width: 64, height: 64 }} />
    )
  ) : (
    <Box
      sx={{
        backgroundColor: '#fffff0',
        padding: 4,
        borderRadius: 4,
      }}
    >
      <Typography role={`error`}>問題の開始に失敗しました。。。前の画面からやり直してください。</Typography>
    </Box>
  );
};
