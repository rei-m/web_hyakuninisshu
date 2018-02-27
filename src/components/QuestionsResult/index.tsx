import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Tatami from '../Tatami';
import QuestionResultsSummary from '../QuestionResultsSummary';

export interface QuestionsResultProps {
  readonly totalCount: number;
  readonly correctCount: number;
  readonly averageAnswerSecond: number;
  readonly onClickRestart: () => void;
}

const RootSection = Tatami.extend`
  width: 100vw;
  min-height: calc(100vh - 56px);

  @media screen and (min-width: 768px) {
    min-height: calc(100vh - 64px);
  }
`;

const Inner = styled.div`
  max-width: 380px;
  padding: 16px;
  margin: auto;
`;

const Button = styled.button`
  margin: 16px;
`;

const QuestionsResult = ({
  averageAnswerSecond,
  correctCount,
  totalCount,
  onClickRestart
}: QuestionsResultProps) => (
  <RootSection>
    <Inner>
      <QuestionResultsSummary
        title={'正解数'}
        value={`${correctCount} / ${totalCount}`}
        style={{ marginBottom: 16 }}
      />
      <QuestionResultsSummary
        title={'平均回答時間'}
        value={`${averageAnswerSecond}秒`}
        style={{ marginBottom: 16 }}
      />
      {correctCount !== totalCount && (
        <Button
          onClick={onClickRestart}
          className="pt-button pt-large pt-icon-repeat"
        >
          間違えた歌の練習をする
        </Button>
      )}
      <Link to="/training" replace={true}>
        <Button
          className="pt-button pt-large pt-icon-undo"
          style={{ marginTop: 0 }}
        >
          メニューに戻る
        </Button>
      </Link>
    </Inner>
  </RootSection>
);

export default QuestionsResult;
