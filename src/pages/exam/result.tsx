import React from 'react';
import { useSelector } from 'react-redux';
import { navigate } from 'gatsby';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PlayingPageTemplate from '@src/components/templates/PlayingPageTemplate';
import ExamResult from '@src/containers/organisms/ExamResult';
import Ad from '@src/components/organisms/Ad';
import CenteredFrame from '@src/components/atoms/CenteredFrame';
import Txt from '@src/components/atoms/Txt';
import { ROUTE_PATHS } from '@src/constants';
import { QuestionState } from '@src/enums';
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

const onClickRestartHandler = () => {
  navigate(ROUTE_PATHS.TRAINING_QUESTION, {
    state: {
      submitTime: new Date().getTime(),
      restart: true,
    },
  });
};

const onClickBackHandler = () => {
  navigate(ROUTE_PATHS.EXAM, { replace: true });
};

const useStyles = makeStyles<ThemeInterface>(() => ({
  errorMessage: {
    height: '300px',
    width: '100%',
  },
}));

export const ExamResultPagePresenter = ({ questionState }: PresenterProps) => {
  const classes = useStyles();
  return (
    <PlayingPageTemplate
      title={`百人一首 - 腕試し結果 -`}
      isDisplayNav={false}
      onClickBack={onClickBackHandler}
      content={
        <>
          <Ad type={`top`} />
          {questionState === QuestionState.Finished ? (
            <ExamResult onClickRestart={onClickRestartHandler} onClickBack={onClickBackHandler} />
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

export const ExamResultPageContainer = ({ presenter }: ContainerProps) => {
  const { questionState } = useSelector<GlobalState, questionsTypes.State>(state => state.questions);
  return presenter({ questionState });
};

export const ExamResultPage = () => <ExamResultPageContainer presenter={ExamResultPagePresenter} />;

export default ExamResultPage;
