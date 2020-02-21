import React from 'react';
import { useSelector } from 'react-redux';
import { navigate } from 'gatsby';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PlayingPageTemplate from '@src/components/templates/PlayingPageTemplate';
import TrainingResult from '@src/containers/organisms/TrainingResult';
import Ad from '@src/components/organisms/Ad';
import CenteredFrame from '@src/components/atoms/CenteredFrame';
import Txt from '@src/components/atoms/Txt';
import { QuestionState } from '@src/enums';
import { ROUTE_PATHS } from '@src/constants';
import { GlobalState } from '@src/state';
import { questionsTypes } from '@src/state/questions';
import { ThemeInterface } from '@src/styles/theme';

export type ConnectedProps = {
  questionState?: QuestionState;
};

export type PresenterProps = ConnectedProps;

export type ContainerProps = {
  presenter: React.FC<PresenterProps>;
};

const useStyles = makeStyles<ThemeInterface>(() => ({
  errorMessage: {
    height: 300,
    width: '100%',
  },
}));

const onClickRestartHandler = () => {
  navigate(ROUTE_PATHS.TRAINING_QUESTION, {
    state: {
      submitTime: new Date().getTime(),
      restart: true,
    },
  });
};

const onClickBackHandler = () => {
  navigate(ROUTE_PATHS.TRAINING, { replace: true });
};

export const TrainingResultPagePresenter = ({ questionState }: PresenterProps) => {
  const classes = useStyles();
  return (
    <PlayingPageTemplate
      title={`百人一首 - 練習結果 -`}
      isDisplayNav={false}
      onClickBack={onClickBackHandler}
      content={
        <>
          <Ad type={`top`} />
          {questionState === QuestionState.Finished ? (
            <TrainingResult onClickRestart={onClickRestartHandler} onClickBack={onClickBackHandler} />
          ) : (
            <CenteredFrame tag={`div`} className={classes.errorMessage}>
              <Txt role={`error`}>不正な遷移を行いました。前の画面からやり直してください。</Txt>
            </CenteredFrame>
          )}
          <Ad type={`responsive`} />
        </>
      }
    />
  );
};

export const TrainingResultPageContainer = ({ presenter }: ContainerProps) => {
  const { questionState } = useSelector<GlobalState, questionsTypes.State>(state => state.questions);
  return presenter({ questionState });
};

export const TrainingResultPage = () => <TrainingResultPageContainer presenter={TrainingResultPagePresenter} />;

export default TrainingResultPage;
