import * as React from 'react';
import { navigate } from 'gatsby';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import QuestionResultsSummary from '@src/components/QuestionResultsSummary';
import QuestionResultsMap from '@src/components/QuestionResultsMap';
import KarutaCardDialog from '@src/components/KarutaCardDialog';
import AppButton from '@src/components/AppButton';
import TweetButton from '@src/components/TweetButton';
import { Answer, Karuta, Question } from '@src/types';

export interface Props {
  totalCount: number;
  correctCount: number;
  averageAnswerSecond: number;
  questions: Question[];
  answers: Answer[];
  onClickRestart: () => void;
}

export interface State {
  displayedKaruta?: Karuta;
}

const Container = styled.div`
  max-width: 380px;
  padding: ${({ theme }) => theme.spacing2x};
  margin: auto;
`;

const ShareButtonsWrapper = styled.div`
  text-align: center;
`;

const onClickBack = () => {
  navigate('/exam', { replace: true });
};

const ExamResult: React.FC<Props> = ({
  averageAnswerSecond,
  correctCount,
  totalCount,
  questions,
  answers,
  onClickRestart,
}) => {
  const [state, setState] = React.useState<State>({});

  const onClickResultsMap = (karuta: Karuta) => {
    setState({ displayedKaruta: karuta });
  };

  const onCloseDialog = () => {
    setState({ displayedKaruta: undefined });
  };

  return (
    <Container>
      <QuestionResultsSummary
        title="正解数"
        value={`${correctCount} / ${totalCount}`}
        style={{ marginBottom: appTheme.spacing2x }}
      />
      <QuestionResultsSummary
        title="平均回答時間"
        value={`${averageAnswerSecond}秒`}
        style={{ marginBottom: appTheme.spacing4x }}
      />
      <ShareButtonsWrapper>
        <TweetButton text={`百人一首で ${totalCount}問中 ${correctCount}問 正解しました！`} />
      </ShareButtonsWrapper>
      <QuestionResultsMap
        questions={questions}
        answers={answers}
        onClickResult={onClickResultsMap}
        style={{ marginBottom: appTheme.spacing2x }}
      />
      {correctCount !== totalCount && (
        <AppButton
          label="間違えた歌の練習をする"
          icon="refresh"
          type="normal"
          onClick={onClickRestart}
          data-test="restart-training"
          style={{ margin: appTheme.spacing2x }}
        />
      )}
      <AppButton label="メニューに戻る" icon="arrow_back" type="normal" onClick={onClickBack} data-test="back" />
      <KarutaCardDialog open={!!state.displayedKaruta} onClose={onCloseDialog} karuta={state.displayedKaruta} />
    </Container>
  );
};

export default ExamResult;
