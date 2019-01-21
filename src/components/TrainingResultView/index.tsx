import * as React from 'react';
import { navigate } from 'gatsby';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import QuestionResultsSummary from '@src/components/QuestionResultsSummary';
import AppButton from '@src/components/AppButton';
import TweetButton from '@src/components/TweetButton';

export interface Props {
  totalCount: number;
  correctCount: number;
  averageAnswerSecond: number;
  onClickRestart: () => void;
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
  navigate('/training', { replace: true });
};

const QuestionsResult: React.FC<Props> = ({ averageAnswerSecond, correctCount, totalCount, onClickRestart }) => (
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
    {correctCount !== totalCount && (
      <AppButton
        label="間違えた歌の練習をする"
        icon="refresh"
        type="normal"
        onClick={onClickRestart}
        data-test="restart"
        style={{ margin: appTheme.spacing2x }}
      />
    )}
    <AppButton label="メニューに戻る" icon="arrow_back" type="normal" onClick={onClickBack} data-test="back" />
  </Container>
);

export default QuestionsResult;
