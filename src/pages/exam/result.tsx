import * as React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import styled from '@src/styles/styled-components';
import PlayingPageTemplate from '@src/components/templates/PlayingPageTemplate';
import ExamResult from '@src/containers/organisms/ExamResult';
import Ad from '@src/components/organisms/Ad';
import CenteredFrame from '@src/components/atoms/CenteredFrame';
import Txt from '@src/components/atoms/Txt';
import { ROUTE_PATHS } from '@src/constants';
import { QuestionState } from '@src/enums';
import { GlobalState } from '@src/state';

export interface ConnectedProps {
  questionState?: QuestionState;
}

export type Props = ConnectedProps;

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

const ErrorMessage = styled(CenteredFrame)`
  height: 300px;
  width: 100%;
`;

export const ExamResultPage = ({ questionState }: Props) => (
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
          <ErrorMessage tag={`div`}>
            <Txt role={`error`}>不正な遷移を行いました。前の画面からやり直してください。</Txt>
          </ErrorMessage>
        )}
        <Ad type={`responsive`} />
      </>
    }
  />
);

export const mapStateToProps = ({ questions }: GlobalState): ConnectedProps => ({
  questionState: questions.questionState,
});

export default connect(mapStateToProps)(ExamResultPage);
