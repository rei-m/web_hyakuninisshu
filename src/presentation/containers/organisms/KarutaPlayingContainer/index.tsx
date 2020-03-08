import React, { useEffect, useCallback } from 'react';
import { Redirect } from '@reach/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { paths } from '@src/presentation/routes';
import KarutaPlaying from '@src/presentation/components/organisms/KarutaPlaying';
import KarutaPlayingCorrect from '@src/presentation/components/organisms/KarutaPlayingCorrect';
import CenteredFrame from '@src/presentation/components/atoms/CenteredFrame';
import Progress from '@src/presentation/components/atoms/Progress';
import Txt from '@src/presentation/components/atoms/Txt';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '@src/state';
import { questionsTypes } from '@src/state/questions';
import { useQuestionDiContainer } from '@src/presentation/hooks/useQuestionDiContainer';
import { QuestionId } from '@src/domain/models';

export type Props = {
  kamiNoKuStyle: questionsTypes.KarutaStyleCondition;
  shimoNoKuStyle: questionsTypes.KarutaStyleCondition;
  questionAnim: questionsTypes.QuestionAnimCondition;
  resultUrl: ReturnType<typeof paths.trainingResult> | ReturnType<typeof paths.examResult>;
};

const useStyles = makeStyles<ThemeInterface>(() => ({
  errorMessage: {
    height: 300,
    width: '100%',
  },
}));

type PickedState = Pick<questionsTypes.State, 'state' | 'currentQuestion' | 'totalCount' | 'currentPosition'>;

const KarutaPlayingContainer = ({ kamiNoKuStyle, shimoNoKuStyle, questionAnim, resultUrl }: Props) => {
  const { state, currentQuestion, totalCount, currentPosition } = useSelector<GlobalState, PickedState>(
    state => state.questions
  );

  const { questionsActionCreator } = useQuestionDiContainer();

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentQuestion) {
      dispatch(
        questionsActionCreator.startQuestion(currentQuestion.questionId, kamiNoKuStyle, shimoNoKuStyle, new Date())
      );
    }
  }, [currentQuestion?.questionId]);

  const handleClickToriFuda = useCallback((questionId: QuestionId, toriFuda: questionsTypes.ToriFuda) => {
    dispatch(questionsActionCreator.answerQuestion(questionId, toriFuda, new Date()));
  }, []);

  const handleClickResult = useCallback(() => {
    dispatch(questionsActionCreator.confirmCorrect());
  }, []);

  const handleClickGoToNext = useCallback((questionId: QuestionId) => {
    dispatch(questionsActionCreator.openNextQuestionAction(questionId));
  }, []);

  const handleClickGoToResult = useCallback(() => {
    dispatch(questionsActionCreator.finishQuestion());
  }, []);

  const classes = useStyles();
  return currentQuestion ? (
    currentQuestion.content ? (
      state === 'playing' ? (
        <KarutaPlaying
          questionId={currentQuestion.questionId}
          yomiFuda={currentQuestion.content.yomiFuda}
          toriFudaList={currentQuestion.content.toriFudaList}
          totalCount={totalCount}
          currentPosition={currentPosition}
          duration={questionsTypes.QuestionAnimCondition.toDulation(questionAnim)}
          answer={currentQuestion.answer}
          onClickToriFuda={handleClickToriFuda}
          onClickResult={handleClickResult}
        />
      ) : state === 'confirm' ? (
        <KarutaPlayingCorrect
          questionId={currentQuestion.questionId}
          karuta={currentQuestion.answer!.correctKaruta}
          isAllAnswered={totalCount === currentPosition}
          onClickGoToNext={handleClickGoToNext}
          onClickGoToResult={handleClickGoToResult}
        />
      ) : state === 'finished' ? (
        <Redirect to={resultUrl} noThrow replace />
      ) : (
        <></>
      )
    ) : (
      <Progress />
    )
  ) : (
    <CenteredFrame tag={`div`} className={classes.errorMessage}>
      <Txt role={`error`}>問題の開始に失敗しました。。。前の画面からやり直してください。</Txt>
    </CenteredFrame>
  );
};

export default KarutaPlayingContainer;
