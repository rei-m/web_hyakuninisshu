import React, { useCallback } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { paths } from '@src/presentation/routes';
import PlayingPageTemplate from '@src/presentation/components/templates/PlayingPageTemplate';
import KarutaPlayingResult from '@src/presentation/components/organisms/KarutaPlayingResult';
import Ad from '@src/presentation/components/organisms/Ad';
import CenteredFrame from '@src/presentation/components/atoms/CenteredFrame';
import Txt from '@src/presentation/components/atoms/Txt';
import { GlobalState } from '@src/state';
import { questionsTypes } from '@src/state/questions';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { useQuestionDiContainer } from '@src/presentation/hooks/useQuestionDiContainer';

export type Props = Pick<RouteComponentProps, 'navigate'>;

export type PresenterProps = Pick<questionsTypes.State, 'state' | 'result'> & {
  totalCount: number;
  onClickRestart: () => void;
  onClickBack: () => void;
};

export type ContainerProps = {
  presenter: (props: PresenterProps) => React.ReactElement;
} & Props;

const useStyles = makeStyles<ThemeInterface>(() => ({
  errorMessage: {
    height: 300,
    width: '100%',
  },
}));

type PickedState = Pick<questionsTypes.State, 'state' | 'result' | 'totalCount'>;

export const Presenter = ({ state, result, totalCount, onClickRestart, onClickBack }: PresenterProps) => {
  const classes = useStyles();
  return (
    <PlayingPageTemplate
      title={`百人一首 - 練習結果 -`}
      isDisplayNav={false}
      onClickBack={onClickBack}
      content={
        <>
          <Ad type={`responsive`} />
          {state === 'finished' && !!result ? (
            <KarutaPlayingResult
              totalCount={totalCount}
              correctCount={result.correctCount}
              averageAnswerSecond={result.averageAnswerSecond}
              onClickRestart={onClickRestart}
              onClickBack={onClickBack}
            />
          ) : state === 'ready' ? (
            <Redirect to={paths.trainingQuestion()} replace noThrow />
          ) : (
            <CenteredFrame tag={`div`} className={classes.errorMessage}>
              <Txt role={`error`}>問題の開始に失敗しました。。。前の画面からやり直してください。</Txt>
            </CenteredFrame>
          )}
          <Ad type={`responsive`} />
        </>
      }
    />
  );
};

const Container = ({ presenter, navigate }: ContainerProps) => {
  const { state, result, totalCount } = useSelector<GlobalState, PickedState>((state) => state.questions);
  const dispatch = useDispatch();
  const { questionsActionCreator } = useQuestionDiContainer();

  const handleClickRestart = () => {
    dispatch(questionsActionCreator.restartTraining());
  };

  const handleClickBack = useCallback(() => {
    if (navigate) {
      navigate(paths.training(), { replace: true });
    }
  }, [navigate]);

  return presenter({
    state,
    result,
    totalCount,
    onClickRestart: handleClickRestart,
    onClickBack: handleClickBack,
  });
};

export const TrainingResultPage = (props: Props) => <Container {...props} presenter={Presenter} />;

export default TrainingResultPage;
