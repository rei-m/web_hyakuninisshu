import React, { useCallback, useState } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { paths } from '@src/presentation/routes';
import PlayingPageTemplate from '@src/presentation/components/templates/PlayingPageTemplate';
import KarutaPlayingResult from '@src/presentation/components/organisms/KarutaPlayingResult';
import Material from '@src/presentation/components/organisms/Material';
import Ad from '@src/presentation/components/organisms/Ad';
import QuestionJudgement from '@src/presentation/components/molecules/QuestionJudgement';
import ClosableDialog from '@src/presentation/components/molecules/ClosableDialog';
import CenteredFrame from '@src/presentation/components/atoms/CenteredFrame';
import Txt from '@src/presentation/components/atoms/Txt';
import Block from '@src/presentation/components/atoms/Block';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { useQuestionDiContainer } from '@src/presentation/hooks/useQuestionDiContainer';
import { GlobalState } from '@src/state';
import { questionsTypes } from '@src/state/questions';
import { Karuta } from '@src/domain/models';

export type Props = Pick<RouteComponentProps, 'navigate'>;

export type PresenterProps = Pick<questionsTypes.State, 'state' | 'result'> & {
  totalCount: number;
  displayedKaruta?: Karuta;
  onClickRestart: () => void;
  onClickBack: () => void;
  onClickJudgement: (karuta: Karuta) => void;
  onCloseMaterialDialog: () => void;
};

export type ContainerProps = {
  presenter: (props: PresenterProps) => React.ReactElement;
} & Props;

const useStyles = makeStyles<ThemeInterface>(theme => ({
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: theme.colorThin,
    boxSizing: 'border-box',
    boxShadow: theme.elevationShadow1x,
    borderRadius: 4,
    margin: theme.spacing(2, 0),
  },
  questionJudgement: {
    width: '20%',
    height: 69,
    padding: theme.spacing(2),
  },
  errorMessage: {
    height: '300px',
    width: '100%',
  },
}));

type PickedState = Pick<questionsTypes.State, 'state' | 'result' | 'totalCount'>;

export const Presenter = ({
  state,
  result,
  totalCount,
  displayedKaruta,
  onClickRestart,
  onClickBack,
  onClickJudgement,
  onCloseMaterialDialog,
}: PresenterProps) => {
  const classes = useStyles();
  return (
    <PlayingPageTemplate
      title={`百人一首 - 腕試し結果 -`}
      isDisplayNav={false}
      onClickBack={onClickBack}
      content={
        <>
          <Ad type={`top`} />
          {state === 'finished' && !!result ? (
            <>
              <KarutaPlayingResult
                totalCount={totalCount}
                correctCount={result.correctCount}
                averageAnswerSecond={result.averageAnswerSecond}
                onClickRestart={onClickRestart}
                onClickBack={onClickBack}
              >
                <Block className={classes.content}>
                  {result.answerList.map(answer => (
                    <QuestionJudgement
                      key={answer.questionId}
                      karuta={answer.correctKaruta}
                      correct={answer.isCorrect}
                      onClick={onClickJudgement}
                      className={classes.questionJudgement}
                      data-test={`question-${answer.questionId}`}
                    />
                  ))}
                </Block>
              </KarutaPlayingResult>
              <ClosableDialog
                open={!!displayedKaruta}
                onClose={onCloseMaterialDialog}
                PaperProps={{
                  style: { maxWidth: 380 },
                }}
              >
                {displayedKaruta && <Material karuta={displayedKaruta} />}
              </ClosableDialog>
            </>
          ) : state === 'ready' ? (
            <Redirect to={paths.examQuestion()} replace noThrow />
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

export const Container = ({ presenter, navigate }: ContainerProps) => {
  const { state, result, totalCount } = useSelector<GlobalState, PickedState>(state => state.questions);
  const dispatch = useDispatch();
  const { questionsActionCreator } = useQuestionDiContainer();

  const [displayedKaruta, setKaruta] = useState<Karuta>();

  const closeDialog = useCallback(() => {
    setKaruta(undefined);
  }, []);

  const handleClickRestart = () => {
    dispatch(questionsActionCreator.restartTraining());
  };

  const handleClickBack = useCallback(() => {
    if (navigate) {
      navigate(paths.exam(), { replace: true });
    }
  }, [navigate]);

  return presenter({
    state,
    result,
    totalCount,
    displayedKaruta,
    onClickRestart: handleClickRestart,
    onClickBack: handleClickBack,
    onClickJudgement: setKaruta,
    onCloseMaterialDialog: closeDialog,
  });
};

export const ExamResultPage = (props: Props) => <Container {...props} presenter={Presenter} />;

export default ExamResultPage;
